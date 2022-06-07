/* eslint react/jsx-curly-brace-presence: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint no-unused-expressions: "off" */
/* eslint react/jsx-no-target-blank: "off" */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Text, Flex, Button } from "uikit";
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
  const [disabled, setDisabled] = useState(true);

  const {
    tokenId,
    hunterRarity: rarity,
    userHasHunter: hasToken,
    hunterInMission,
    missionData,
  } = userData;
  const { hunterNextPlayTime: nextPlayTime } = missionData.find(
    (missiond) => missiond.missionId === mission.missionId
  );
  const { requiredRarity, price } = mission;
  const {
    dataSavingKey,
    missionStartTime,
    isLastMissionReadyToReveal,
    isLastMissionViewed,
  } = checkLastMissionStatus(account);
  const mstn = parseInt(missionStartTime);

  const { onStart } = useStartPolygalacticHunterMission(
    tokenId,
    requiredRarity
  );

  const isHunterReadyForNextMission = nextPlayTime * 1000 <= Date.now();

  console.log(
    "ishunterready: ",
    hunterInMission,
    isLastMissionViewed,
    isLastMissionReadyToReveal
  );

  useEffect(() => {
    console.log("ahbdhsa: ", !isLastMissionViewed);
    if (
      !isLastMissionViewed &&
      isLastMissionReadyToReveal &&
      hunterInMission > 0
    ) {
      setButtonText("Mission Result");
      setDisabled(false);
    } else if (
      !isLastMissionViewed &&
      !isLastMissionReadyToReveal &&
      hunterInMission > 0
    ) {
      setButtonText(
        `${timeLeftForReveal(Date.now(), mstn)} left to finish the mission.`
      );
      setDisabled(true);
    } else if (isRewardFinished) {
      setButtonText("Rewards are finalized!");
      setDisabled(true);
    } else if (tokenBalance < price) {
      setButtonText("You don't have enough tokens!");
      setDisabled(true);
    } else if (!hasToken) {
      setButtonText("You don't have a hunter!");
      setDisabled(true);
    } else if (rarity < requiredRarity) {
      setButtonText(
        "Your Hunter's rarity is not enough to start this mission!"
      );
      setDisabled(true);
    } else if (!isHunterReadyForNextMission) {
      setButtonText(
        `You need to wait ${getTimeLeftForNextMission(
          Date.now(),
          nextPlayTime
        )} to start this mission again.`
      );
      setDisabled(true);
    } else {
      setDisabled(false);
      setButtonText("Start Mission");
    }
  }, [
    isLastMissionViewed,
    isLastMissionReadyToReveal,
    hunterInMission,
    isRewardFinished,
    tokenBalance,
    price,
    hasToken,
    rarity,
    requiredRarity,
    isHunterReadyForNextMission,
    nextPlayTime,
    mstn,
  ]);

  const [buttonText, setButtonText] = useState("");

  const handleButtonClick = async () => {
    setDisabled(true);
    if (!isLastMissionViewed && isLastMissionReadyToReveal) await onResult();
    if (
      rarity >= requiredRarity &&
      tokenBalance >= price &&
      !isRewardFinished &&
      isHunterReadyForNextMission
    ) {
      await onStart();
      localStorage.setItem(dataSavingKey, "" + Math.floor(Date.now() / 1000));
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
              DO NOT FORGET THAT YOUR HUNTER MIGHT DIE ON THE MISSION. IF SHE
              DIES, YOU&apos;LL RETAIN MOST OF YOUR EXPERIENCE.
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
                style={{ color: "#DFBC35", textDecoration: "none" }}
                href="https://pulsarfarm.gitbook.io/gamma-polypulsar/features/polygalactic-hunter-new-pve"
                target="_blank"
              >
                You can click here to read the Gitbook.
              </a>
            </Text>
          </GridItem>
        </TextContainer>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
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
                setDisabled(true);
                try {
                  await handleButtonClick();
                } catch (e) {
                  console.log(
                    "An error occured while starting the mission: ",
                    e
                  );
                } finally {
                  setDisabled(false);
                }
              }}
              disabled={disabled}
              size="md"
              style={{ maxWidth: "250px" }}
            >
              {buttonText}
            </Button>
          }
        </Flex>
      </Grid>
    </Modal>
  );
};

export default React.memo(GameWarningModal);
