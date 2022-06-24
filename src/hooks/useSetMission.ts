/* eslint import/prefer-default-export: "off" */
import { useCallback } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useDispatch } from "react-redux";
import { fetchMissionDataAsync } from "state/actions";
import { setMission } from "utils/callHelpers";
import { useERC20, useHunterContract } from "./useContract";
import BigNumber from "bignumber.js";

export const useSetMission = (_paidToken: string, _earnedToken: string) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const gameContract = useHunterContract();
  const paidTokenContract = useERC20(_paidToken);
  const earnedTokenContact = useERC20(_earnedToken);

  const handleSetMission = useCallback(
    async (
      _missionId: string,
      _multiple: string,
      _needRarity: string,
      _xp: string,
      _doNotLoseXp: string,
      _cost: string,
      _reward: string,
      _costAddress: string
    ) => {
      const paidTokenDecimals = await paidTokenContract.methods
        .decimals()
        .call();
      const rewardTokenDecimals = await earnedTokenContact.methods
        .decimals()
        .call();
      const paidTokenCost = new BigNumber(_cost)
        .times(new BigNumber(10).pow(paidTokenDecimals))
        .toFixed();
      const earnedTokenReward = new BigNumber(_reward)
        .times(new BigNumber(10).pow(rewardTokenDecimals))
        .toFixed();
      const txHash = await setMission(
        gameContract,
        _missionId,
        _multiple,
        _needRarity,
        _xp,
        _doNotLoseXp,
        paidTokenCost,
        earnedTokenReward,
        _paidToken,
        _earnedToken,
        _costAddress,
        account
      );
      dispatch(fetchMissionDataAsync());
      return txHash;
    },
    [
      account,
      dispatch,
      gameContract,
      _earnedToken,
      _paidToken,
      earnedTokenContact.methods,
      paidTokenContract.methods,
    ]
  );

  return { onSetMission: handleSetMission };
};
