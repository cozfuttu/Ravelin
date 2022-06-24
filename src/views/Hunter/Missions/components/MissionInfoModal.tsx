/* eslint react/jsx-curly-brace-presence: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint no-unused-expressions: "off" */
/* eslint react/jsx-no-target-blank: "off" */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Text, Flex, Button, useMatchBreakpoints } from "uikit";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { HunterMissionData, HunterUserData } from "state/types";
import useStartPolygalacticHunterMission from "hooks/useStartPolygalacticHunterMission";
import checkLastMissionStatus from "views/Hunter/utils/checkLastMissionStatus";
import getTimeLeftForNextMission from "views/Hunter/utils/getTimeLeftForNextMission";
import useCurrentTime from "hooks/useTimer";
import timeLeftForReveal from "views/Hunter/utils/getTimeLeftForRevealResult";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 400px 200px;
  gap: 16px;
  max-width: 688px;

  @media (max-width: 1080px) {
    grid-template-rows: 150px 200px;
    grid-template-columns: inherit;
  }
`;

const TextContainer = styled.div`
  margin-bottom: 10px;
`;

const GridItem = styled.div`
  margin-bottom: 16px;
`;

interface GameInfoModalProps {
  mission: HunterMissionData;
  userData: HunterUserData;
  isRewardFinished: boolean;
  tokenBalance: number;
  onDismiss?: () => void;
  onResult?: () => Promise<void>;
}

const GameWarningModal: React.FC<GameInfoModalProps> = ({
  mission,
  userData,
  isRewardFinished,
  tokenBalance,
  onResult,
  onDismiss,
}) => {
  const { account } = useWallet();
  const [disabled, setDisabled] = useState(false);
  const [pendingTx, setPendingTx] = useState(false)
  const currentTimeMilis = useCurrentTime()

  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;

  const {
    tokenId,
    hunterRarity: rarity,
    userHasHunter: hasToken,
    missionData,
  } = userData;
  const { hunterNextPlayTime: nextPlayTime } = missionData.find(
    (missiond) => missiond.missionId === mission.missionId
  );
  const { requiredRarity, price, playableWith } = mission;
  const {
    dataSavingKey,
    missionStartTime,
    isLastMissionReadyToReveal,
    isLastMissionViewed,
  } = checkLastMissionStatus(account);
  const mstn = parseInt(missionStartTime);

  const [hunterOnMission, setHunterOnMission] = useState(!isLastMissionViewed)

  const { onStart } = useStartPolygalacticHunterMission(
    tokenId,
    mission.missionId
  );

  const isHunterReadyForNextMission = nextPlayTime * 1000 <= Date.now();

  useEffect(() => {
    if (
      !isLastMissionViewed &&
      isLastMissionReadyToReveal &&
      hunterOnMission
    ) {
      setDisabled(false)
      setButtonText("Launch Mission (no cost)");
    }

    else if (
      !isLastMissionViewed &&
      !isLastMissionReadyToReveal &&
      hunterOnMission
    ) {
      setButtonText(
        `Arriving Destination ${timeLeftForReveal(currentTimeMilis, mstn)}`
      );
      setDisabled(true);
    }

    else if (isRewardFinished) {
      setButtonText("Rewards are finalized!");
      setDisabled(true);
    }

    else if (tokenBalance < price) {
      setButtonText("Not enough tokens!");
      setDisabled(true);
    }

    else if (!hasToken) {
      setButtonText("You don't have a hunter!");
      setDisabled(true);
    }

    else if (rarity < requiredRarity) {
      setButtonText(
        "Hunter level is low."
      );
      setDisabled(true);
    }

    else if (!isHunterReadyForNextMission) {
      setButtonText(
        `Cooldown ${getTimeLeftForNextMission(currentTimeMilis, nextPlayTime)}`
      );
      setDisabled(true);
    }

    else {
      setDisabled(false)
      setButtonText(`Equip Hunter (${price} ${playableWith.toUpperCase()})`);
    }
  }, [
    isLastMissionViewed,
    isLastMissionReadyToReveal,
    hunterOnMission,
    isRewardFinished,
    tokenBalance,
    price,
    playableWith,
    hasToken,
    rarity,
    requiredRarity,
    isHunterReadyForNextMission,
    nextPlayTime,
    mstn,
    currentTimeMilis
  ]);

  const [buttonText, setButtonText] = useState("");

  const handleButtonClick = async () => {
    if (!isLastMissionViewed && isLastMissionReadyToReveal) {
      await onResult()
      setHunterOnMission(false)
    }
    else if (
      rarity >= requiredRarity &&
      tokenBalance >= price &&
      !isRewardFinished &&
      isHunterReadyForNextMission
    ) {
      console.log('starting')
      await onStart();
      localStorage.setItem(dataSavingKey, "" + Math.floor(Date.now() / 1000));
      setHunterOnMission(true)
    } else {
      return null;
    }
  };

  return (
    <Modal
      title="/images/hunter/missionImages/InfoModal.png"
      onDismiss={onDismiss}
    >
      <Grid>
        <TextContainer>
          <GridItem>
            <Text
              style={{
                textAlign: "start",
                marginTop: "5px",
                fontWeight: "700",
              }}
              color="white"
            >
              IMPORTANT WARNING!
            </Text>
            <Text
              style={{
                textAlign: "start",
                marginTop: "5px",
                fontSize: "14px",
              }}
            >
              If you fail the mission, you will not receive rewards and lose
              some experience.
            </Text>
          </GridItem>
          <GridItem>
            <Text
              style={{
                textAlign: "start",
                marginTop: "5px",
                fontSize: "14px",
              }}
              color="#00fff2"
            >
              IT IS STRICTLY ADVISED TO READ ABOUT THE POLYGALACTIC HUNTER
              GITBOOK BEFORE STARTING!
            </Text>
          </GridItem>
          <GridItem>
            <Text
              style={{
                marginTop: "5px",
              }}
            >
              <a
                style={{ color: "#DFBC35" }}
                href="https://pulsarfarm.gitbook.io/gamma-polypulsar/features/polygalactic-hunter-new-pve"
                target="_blank"
              >
                You can click here to read the Gitbook.
              </a>
            </Text>
          </GridItem>
        </TextContainer>
        <Flex
          flexDirection={isMobile ? "row" : "column"}
          justifyContent="space-around"
          alignItems="center"
        >
          <img
            src="images/hunter/PolygalacticHunterLogo.png"
            alt="Polygalactic Hunter"
            width={200}
          />
          {
            <Button
              onClick={async () => {
                setPendingTx(true);
                try {
                  await handleButtonClick();
                } catch (e) {
                  console.log(
                    "An error occured while starting the mission: ",
                    e
                  );
                } finally {
                  setPendingTx(false);
                  setDisabled(false)
                }
              }}
              disabled={disabled || pendingTx}
              size="md"
              style={{ maxWidth: isMobile ? "170px" : "260px" }}
            >
              {buttonText}
            </Button>
          }
        </Flex>
      </Grid>
    </Modal>
  );
};

export default GameWarningModal;
