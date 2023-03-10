import BigNumber from "bignumber.js";
import erc20 from "config/abi/erc20.json";
import erc20Lp from "config/abi/erc20LP.json"
import interstellarAbi from "config/abi/interstellar.json";
import multicall from "utils/multicall";
import interstellars from "config/constants/interstellars";

const fetchInterstellars = async () => {
  const data = await Promise.all(
    interstellars.map(async (interstellarConfig) => {
      const tokenAddressCalls = [
        {
          address: interstellarConfig.contractAddress,
          name: "stakeToken",
        },
        {
          address: interstellarConfig.contractAddress,
          name: "rewardToken",
        },
      ];
      const [[stakeTokenAddress], [rewardTokenAddress]] = await multicall(
        interstellarAbi,
        tokenAddressCalls
      );

      const isStakeLP = stakeTokenAddress === interstellarConfig.stakeLpAddresses[0];
      const isRewardLP = rewardTokenAddress === interstellarConfig.rewardLpAddresses[0];

      const calls = [
        // Balance of staked token in the interstellar contract
        {
          address: stakeTokenAddress,
          name: "balanceOf",
          params: [interstellarConfig.contractAddress],
        },
        // Balance of rewarded token on interstellar contract
        {
          address: rewardTokenAddress,
          name: "balanceOf",
          params: [interstellarConfig.contractAddress],
        },
        // Staked Token decimals
        {
          address: stakeTokenAddress,
          name: "decimals",
        },
        // Rewarded Token decimals
        {
          address: rewardTokenAddress,
          name: "decimals",
        },
      ];

      const [
        tokenBalance,
        rewardTokenBalance,
        [stakedTokenDecimals],
        [rewardTokenDecimals],
      ] = await multicall(erc20, calls);

      const stakedTokenExactAmount = new BigNumber(tokenBalance).div(
        new BigNumber(10).pow(stakedTokenDecimals)
      );
      const rewardTokenExactAmount = new BigNumber(rewardTokenBalance).div(
        new BigNumber(10).pow(rewardTokenDecimals)
      );

      const stakeTokenPrices = [];
      const stakeTokenPriceCoefficients = [];
      const stakeTokenAddressesInLP = [];
      let stakeTokenReserve = "0"; // amount of main token in the first given LP address.
      let otherStakeTokenReserve = "0"; // amount of other token in the first given LP address.
      let firstStakeLpTotalSupply = "0"; // amount of total LP supply in the first given LP address.
      let reverseFirstIndexStake = false; // reverse the first index of tokenPriceCoefficients array if needed.

      const rewardTokenPrices = [];
      const rewardTokenPriceCoefficients = [];
      const rewardTokenAddressesInLP = [];
      let rewardTokenReserve = "0"; // amount of main token in the first given LP address.
      let otherRewardTokenReserve = "0"; // amount of other token in the first given LP address.
      let firstRewardLpTotalSupply = "0"; // amount of total LP supply in the first given LP address.
      let reverseFirstIndexReward = false; // reverse the first index of tokenPriceCoefficients array if needed.

      // finding the prices of tokens in the given LP address (interstellar.stakeLpAddresses)
      for (const [index, lpAddress] of interstellarConfig.stakeLpAddresses.entries()) {
        console.log("-------------Iterating index ", index, "-------------");
        const tokenCalls = [
          {
            address: lpAddress,
            name: "token0",
          },
          {
            address: lpAddress,
            name: "token1",
          },
          {
            address: lpAddress,
            name: "getReserves",
          },
          {
            address: lpAddress,
            name: "totalSupply",
          },
        ];

        let [[token0], [token1], [token0Reserves, token1Reserves], [lpTotalSupply]] = await multicall(erc20Lp, tokenCalls);

        const decimalCalls = [
          {
            address: token0,
            name: "decimals",
          },
          {
            address: token1,
            name: "decimals",
          },
          {
            address: token0,
            name: "symbol",
          },
          {
            address: token1,
            name: "symbol",
          },
        ];

        const [[token0Decimals], [token1Decimals], [token0Name], [token1Name]] = await multicall(erc20Lp, decimalCalls);

        const token1ReservesExact = new BigNumber(token1Reserves._hex).div(10 ** token1Decimals);
        const token0ReservesExact = new BigNumber(token0Reserves._hex).div(10 ** token0Decimals);

        // calculating the coefficient
        var coefficient = "0";
        if (index === 0) {
          stakeTokenAddressesInLP.push(token0, token1);
          stakeTokenReserve = token1ReservesExact.toFixed(8);
          otherStakeTokenReserve = token0ReservesExact.toFixed(8);
          firstStakeLpTotalSupply = new BigNumber(lpTotalSupply._hex).div(1e18).toFixed(8);
          coefficient = token1ReservesExact.div(token0ReservesExact).toFixed(8);
        } else if (token0 === stakeTokenAddressesInLP[0]) {
          coefficient = token1ReservesExact.div(token0ReservesExact).toFixed(8);
          if (index === 1) reverseFirstIndexStake = true;
        } else if (token0 === stakeTokenAddressesInLP[1]) {
          coefficient = token1ReservesExact.div(token0ReservesExact).toFixed(8);
          if (index === 1) stakeTokenReserve = otherStakeTokenReserve;
        } else if (token1 === stakeTokenAddressesInLP[0]) {
          coefficient = token0ReservesExact.div(token1ReservesExact).toFixed(8);
          if (index === 1) reverseFirstIndexStake = true;
        } else if (token1 === stakeTokenAddressesInLP[1]) {
          coefficient = token0ReservesExact.div(token1ReservesExact).toFixed(8);
          if (index === 1) stakeTokenReserve = otherStakeTokenReserve;
        } else {
          throw new Error(`Please check the addresses you inserted at the index of: ${index - 1} and ${index}`);
        }

        const tokenValuesSorted = []
        if (token0ReservesExact.isGreaterThan(token1ReservesExact))
          tokenValuesSorted.push(token0Name, token1Name)
        else tokenValuesSorted.push(token1Name, token0Name)
        console.log(
          `\n price ratio of ${+coefficient < 1 ? tokenValuesSorted[0] : tokenValuesSorted[1]}/${+coefficient < 1 ? tokenValuesSorted[1] : tokenValuesSorted[0]
          } is ${coefficient} \n`
        );

        stakeTokenAddressesInLP.splice(0, 2, token0, token1);

        stakeTokenPriceCoefficients.push(coefficient);
      }

      // finding the prices of tokens in the given LP address (interstellar.rewardLpAddresses)
      for (const [index, lpAddress] of interstellarConfig.rewardLpAddresses.entries()) {
        console.log("-------------Iterating index ", index, "-------------");
        const tokenCalls = [
          {
            address: lpAddress,
            name: "token0",
          },
          {
            address: lpAddress,
            name: "token1",
          },
          {
            address: lpAddress,
            name: "getReserves",
          },
          {
            address: lpAddress,
            name: "totalSupply",
          },
        ];

        let [[token0], [token1], [token0Reserves, token1Reserves], [lpTotalSupply]] = await multicall(erc20Lp, tokenCalls);

        const decimalCalls = [
          {
            address: token0,
            name: "decimals",
          },
          {
            address: token1,
            name: "decimals",
          },
          {
            address: token0,
            name: "symbol",
          },
          {
            address: token1,
            name: "symbol",
          },
        ];

        const [[token0Decimals], [token1Decimals], [token0Name], [token1Name]] = await multicall(erc20Lp, decimalCalls);

        const token1ReservesExact = new BigNumber(token1Reserves._hex).div(10 ** token1Decimals);
        const token0ReservesExact = new BigNumber(token0Reserves._hex).div(10 ** token0Decimals);

        // calculating the coefficient
        var coefficient = "0";
        if (index === 0) {
          rewardTokenAddressesInLP.push(token0, token1);
          rewardTokenReserve = token1ReservesExact.toFixed(8);
          otherRewardTokenReserve = token0ReservesExact.toFixed(8);
          firstRewardLpTotalSupply = new BigNumber(lpTotalSupply._hex).div(1e18).toFixed(8);
          coefficient = token1ReservesExact.div(token0ReservesExact).toFixed(8);
        } else if (token0 === rewardTokenAddressesInLP[0]) {
          coefficient = token1ReservesExact.div(token0ReservesExact).toFixed(8);
          if (index === 1) reverseFirstIndexReward = true;
        } else if (token0 === rewardTokenAddressesInLP[1]) {
          coefficient = token1ReservesExact.div(token0ReservesExact).toFixed(8);
          if (index === 1) rewardTokenReserve = otherRewardTokenReserve;
        } else if (token1 === rewardTokenAddressesInLP[0]) {
          coefficient = token0ReservesExact.div(token1ReservesExact).toFixed(8);
          if (index === 1) reverseFirstIndexReward = true;
        } else if (token1 === rewardTokenAddressesInLP[1]) {
          coefficient = token0ReservesExact.div(token1ReservesExact).toFixed(8);
          if (index === 1) rewardTokenReserve = otherRewardTokenReserve;
        } else {
          throw new Error(`Please check the addresses you inserted at the index of: ${index - 1} and ${index}`);
        }

        const tokenValuesSorted = []
        if (token0ReservesExact.isGreaterThan(token1ReservesExact))
          tokenValuesSorted.push(token0Name, token1Name)
        else tokenValuesSorted.push(token1Name, token0Name)
        console.log(
          `\n price ratio of ${+coefficient < 1 ? tokenValuesSorted[0] : tokenValuesSorted[1]}/${+coefficient < 1 ? tokenValuesSorted[1] : tokenValuesSorted[0]
          } is ${coefficient} \n`
        );

        rewardTokenAddressesInLP.splice(0, 2, token0, token1);

        rewardTokenPriceCoefficients.push(coefficient);
      }

      if (reverseFirstIndexStake) {
        stakeTokenPriceCoefficients[0] = 1 / stakeTokenPriceCoefficients[0];
      }
      if (reverseFirstIndexReward) {
        rewardTokenPriceCoefficients[0] = 1 / rewardTokenPriceCoefficients[0];
      }

      // calculating prices using coefficients
      let product = 1;
      for (let i = stakeTokenPriceCoefficients.length - 1; i >= 0; i--) {
        product *= stakeTokenPriceCoefficients[i];
        stakeTokenPrices[i] = product;
      }
      product = 1;
      for (let i = rewardTokenPriceCoefficients.length - 1; i >= 0; i--) {
        product *= rewardTokenPriceCoefficients[i];
        rewardTokenPrices[i] = product;
      }

      const totalStakeLpPrice = new BigNumber(stakeTokenReserve).times(stakeTokenPrices[0]).times(2);
      const singleStakeLpPrice = totalStakeLpPrice.div(firstStakeLpTotalSupply).toFixed(8);
      const totalRewardLpPrice = new BigNumber(rewardTokenReserve).times(rewardTokenPrices[0]).times(2);
      const singleRewardLpPrice = totalRewardLpPrice.div(firstRewardLpTotalSupply).toFixed(8);

      console.log(`\nThe price of the stake ${isStakeLP ? 'LP' : 'token'} is: ${isStakeLP ? singleStakeLpPrice : stakeTokenPrices[0]} \n Pool: ${interstellarConfig.name}`);
      console.log(`\nThe price of the reward ${isRewardLP ? 'LP' : 'token'} is: ${isRewardLP ? singleRewardLpPrice : rewardTokenPrices[0]} \n Pool: ${interstellarConfig.name}`);

      let rewardTokenPerBlock;
      let startBlock;
      let endBlock;

      try {
        [rewardTokenPerBlock, startBlock, endBlock] = await multicall(
          interstellarAbi,
          [
            {
              address: interstellarConfig.contractAddress,
              name: "rewardPerEpoch",
            },
            {
              address: interstellarConfig.contractAddress,
              name: "startEpoch",
            },
            {
              address: interstellarConfig.contractAddress,
              name: "bonusEndEpoch",
            },
          ]
        );
      } catch (error) {
        console.log("InterstellarABI poolInfo call error", error);
      }

      return {
        ...interstellarConfig,
        stakeTokenAddress,
        rewardTokenAddress,
        stakedTokenDecimals,
        rewardTokenDecimals,
        stakedTokenAmount: stakedTokenExactAmount.toJSON(),
        rewardTokenAmount: rewardTokenExactAmount.toJSON(),
        rewardTokenPerBlock: new BigNumber(rewardTokenPerBlock).toNumber(),
        startBlock: new BigNumber(startBlock).toNumber(),
        endBlock: new BigNumber(endBlock).toNumber(),
        stakeTokenPrice: isStakeLP ? new BigNumber(singleStakeLpPrice).toJSON() : new BigNumber(stakeTokenPrices[0]).toJSON(),
        rewardTokenPrice: isRewardLP ? new BigNumber(singleRewardLpPrice).toJSON() : new BigNumber(rewardTokenPrices[0]).toJSON(),
      };
    })
  );
  return data;
};

export default fetchInterstellars;
