import BigNumber from "bignumber.js";
import { ethers } from "ethers";

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, gasPrice: "100000000000" });
};

export const stake = async (masterChefContract, pid, amount, account) => {
  console.log("depositing: ", new BigNumber(amount).toFixed()); // Doesn't convert to scientific notation
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).toFixed())
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const stakeMasonry = async (masonryContract, amount, account) => {
  console.log("depositing: ", new BigNumber(amount).toFixed()); // Doesn't convert to scientific notation
  return masonryContract.methods
    .stake(new BigNumber(amount).toFixed())
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const stakeInterstellar = async (
  interstellarContract,
  amount,
  account
) => {
  console.log("depositing: ", new BigNumber(amount).toFixed()); // Doesn't convert to scientific notation
  return interstellarContract.methods
    .deposit(new BigNumber(amount).toFixed())
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const approvsse = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account });
};

export const unstake = async (masterChefContract, pid, amount, account) => {
  console.log("withdrawing: ", new BigNumber(amount).toFixed());
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).toFixed())
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const unstakeMasonry = async (masonryContract, amount, account) => {
  console.log("withdrawing: ", new BigNumber(amount).toFixed());
  return masonryContract.methods
    .withdraw(new BigNumber(amount).toFixed())
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const unstakeInterstellar = async (
  interstellarContract,
  amount,
  account
) => {
  return interstellarContract.methods
    .withdraw(new BigNumber(amount).toFixed())
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const exitMasonry = async (masonryContract, account) => {
  return masonryContract.methods
    .exit()
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, "0")
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const harvestInterstellar = async (interstellarContract, account) => {
  return interstellarContract.methods
    .deposit("0")
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const claimReward = async (masonryContract, account) => {
  return masonryContract.methods
    .claimReward()
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const claimRewardDev = async (rshareContract, account) => {
  return rshareContract.methods
    .claimRewards()
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const buyBonds = async (
  treasuryContract,
  tombAmount,
  targetPrice,
  account
) => {
  console.log("target price: ", new BigNumber(targetPrice).toFixed());
  console.log("rav amount: ", new BigNumber(tombAmount).toFixed());
  return treasuryContract.methods
    .buyBonds(
      new BigNumber(tombAmount).toFixed(),
      new BigNumber(targetPrice).toFixed()
    )
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const redeemBonds = async (
  treasuryContract,
  bondAmount,
  targetPrice,
  account
) => {
  console.log("target price: ", new BigNumber(targetPrice).toFixed());
  console.log("rav amount: ", new BigNumber(bondAmount).toFixed());
  return treasuryContract.methods
    .redeemBonds(
      new BigNumber(bondAmount).toFixed(),
      new BigNumber(targetPrice).toFixed()
    )
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const allocateSeigniorage = async (treasuryContract, account) => {
  return treasuryContract.methods
    .allocateSeigniorage()
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

// HUNTER GAME HELPERS

export const buyHunter = async (polygalacticContract, account, name) => {
  return polygalacticContract.methods
    .buyHunter(name)
    .send({ from: account, gasPrice: "100000000000" })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const startMission = async (
  gameContract,
  hunterId,
  missionId,
  account
) => {
  const aaa = await gameContract.methods
    .sendHunterForMission(hunterId, missionId)
    .send({ from: account, gasPrice: "32000000000" })
    .on("transactionHash", (txhash: string) => {
      return txhash;
    })
    .on("error", (error: Error, receipt: Object) => {});
  return aaa;
};

export const revealMission = async (gameContract, account) => {
  const aaa = await gameContract.methods
    .missionResult()
    .send({ from: account, gasPrice: "32000000000" })
    .on("transactionHash", (txhash: string) => {
      return txhash;
    })
    .on("error", (error: Error, receipt: Object) => {});
  return aaa;
};
