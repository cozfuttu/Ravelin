import React from "react";
import styled from "styled-components";
import WidePage from "components/layout/WidePage";
import { Button, Spinner, Text, useModal } from "uikit";
import { useHunter } from "state/hooks";
import MissionCard from "./components/MissionCard";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { isDev } from "config/constants/addresses";
import MissionAddModal from "./components/MissionAddModal";
import { Triangle } from "react-loader-spinner";

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 64px;
  margin-top: 64px;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1080px) {
    margin-top: 13vh;
  }
`;

const BackgroundImg = styled.img`
  width: 1920px;
  z-index: -5;
  top: 0;
  position: fixed;
  opacity: 0.2;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Missions = () => {
  const { account } = useWallet();

  const { missions } = useHunter();

  const isDeveloper = isDev(account);

  const gameCards = missions?.map((mission) => (
    <MissionCard
      key={mission.missionId}
      account={account}
      missionInfo={mission || null}
    />
  ));

  const [onShowMissionAddModal] = useModal(
    <MissionAddModal currentMissionId={missions.length} />,
    true
  );
  return (
    <>
      <BackgroundImg src="images/hunter/PGHBG.webp" alt="Hunter Background" />
      <WidePage>
        {isDeveloper && (
          <Button size="sm" onClick={onShowMissionAddModal}>
            Add Mission
          </Button>
        )}
        <TextContainer>
          <Text color="#003E78" fontSize="40px" bold>
            MISSION BOARD
          </Text>
          <Text
            color="#4E4E4E"
            fontSize="24px"
            bold
            mt="8px"
            style={{ textAlign: "center" }}
          >
            Earn tokens by sending your hunter to missions!
          </Text>
        </TextContainer>
        {gameCards.length > 0 ? (
          <Cards>{gameCards}</Cards>
        ) : (
          <SpinnerContainer>
            <Triangle color="#003E78" />
            <Text color="#003E78" fontSize="24px">
              Loading the missions...
            </Text>
          </SpinnerContainer>
        )}
      </WidePage>
    </>
  );
};

export default Missions;
