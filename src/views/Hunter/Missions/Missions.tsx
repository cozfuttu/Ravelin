import React from "react";
import styled from "styled-components";
import WidePage from "components/layout/WidePage";
import { Text } from "uikit";
import { useHunter } from "state/hooks";
import MissionCard from "./components/MissionCard";
import { useWallet } from "@binance-chain/bsc-use-wallet";

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

const Missions = () => {
  const { account } = useWallet();

  const { missions } = useHunter();
  console.log("djkas: ", missions);

  const gameCards = missions?.map((mission) => (
    <MissionCard
      key={mission.missionId}
      account={account}
      missionInfo={mission || null}
    />
  ));
  return (
    <>
      <BackgroundImg src="images/hunter/PGHBG.webp" alt="Hunter Background" />
      <WidePage>
        <TextContainer>
          <Text color="#003E78" fontSize="40px" bold>
            TAKE PART IN MISSIONS
          </Text>
          <Text color="#4E4E4E" fontSize="24px" bold mt="8px">
            Earn tokens by sending your hunter to missions!
          </Text>
        </TextContainer>
        <Cards>{gameCards}</Cards>
      </WidePage>
    </>
  );
};

export default Missions;
