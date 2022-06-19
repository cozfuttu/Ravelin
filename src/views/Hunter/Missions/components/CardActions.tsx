/* eslint react/jsx-boolean-value: "off" */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useEffect } from "react";
import { Button, Flex, useModal } from "uikit";
import { useTokenBalanceWithoutDecimals } from "hooks/useTokenBalance";
import { HunterMissionData } from "state/types";
import { useHunter } from "state/hooks";
import { useApproveMission } from "hooks/useApprove";
import { useERC20 } from "hooks/useContract";
import MissionInfoModal from "./MissionInfoModal";
import AnimatedResultModal from "./AnimatedResultModal";
import checkLastMissionStatus from "views/Hunter/utils/checkLastMissionStatus";
import useRevealMission from "hooks/useRevealMission";
import BigNumber from "bignumber.js";

interface NftCardActionsProps {
  mission: HunterMissionData;
  account: string;
  isRewardFinished: boolean;
  canBeThey: boolean;
}

const GameInfoButton: React.FC<NftCardActionsProps> = ({
  mission,
  account,
  isRewardFinished,
  canBeThey,
}) => {
  const { userData } = useHunter();
  const { missionData } = userData;
  const { paidTokenAddress } = mission;
  const allowanceMission = missionData[mission.missionId - 1]?.allowanceMission;

  const [requestedApproval, setRequestedApproval] = useState(false);
  const [missionResult, setMissionResult] = useState("0");

  const tokenContract = useERC20(paidTokenAddress);

  const tokenBalance = useTokenBalanceWithoutDecimals(paidTokenAddress);

  const { onApprove } = useApproveMission(tokenContract);
  const { onReveal } = useRevealMission();

  const isApproved = new BigNumber(allowanceMission).isGreaterThan(0)

  const { dataSavingKey, isLastMissionReadyToReveal, isLastMissionViewed } =
    checkLastMissionStatus(account);

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      await onApprove();
      setRequestedApproval(false);
    } catch (e) {
      console.error(e);
    }
  }, [onApprove]);

  const [showResultModal] = useModal(
    <AnimatedResultModal missionResult={missionResult} />,
    true
  );

  useEffect(() => {
    if (parseInt(missionResult) > 0) {
      showResultModal()
      setMissionResult("0")
    };
  }, [missionResult]);

  const handleMissionResult = async () => {
    try {
      const result = await onReveal();
      console.log("result is: ", result);
      localStorage.removeItem(dataSavingKey);
      setMissionResult(result)
    } catch (e) {
      console.log("An error happened while revealing result: ", e);
    }
  };

  const [onPresentGameInfoModal] = useModal(
    <MissionInfoModal
      mission={mission}
      userData={userData}
      tokenBalance={tokenBalance.toNumber()}
      isRewardFinished={isRewardFinished}
      onResult={handleMissionResult}
    />
  );

  return (
    <Flex mb="8px" mt="16px" justifyContent="space-between" alignItems="center">
      {!isLastMissionViewed && isLastMissionReadyToReveal ? (
        <Button mr="10px" onClick={handleMissionResult} fullWidth>
          Mission Result
        </Button>
      ) : isApproved ? (
        canBeThey ? (
          <Button
            onClick={() => {
              onPresentGameInfoModal();
            }}
            fullWidth
          >
            Start Mission
          </Button>
        ) : (
          <Button disabled mr="10px" fullWidth>
            Closed!
          </Button>
        )
      ) : (
        <Button
          mr="10px"
          fullWidth
          disabled={requestedApproval}
          onClick={handleApprove}
        >
          Approve Contract
        </Button>
      )}
    </Flex>
  );
};

export default GameInfoButton;
