import React from "react";
import { useHunter } from "state/hooks";
import styled from "styled-components";
import { Flex, Text } from "uikit";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  background: rgba(45, 58, 74, 0.15);
  max-width: 300px;
  box-shadow: 0 6px 10px -4px #646464;

  @media (max-width: 1080px) {
    max-width: 300px;
    max-height: 900px;
  }
`;

const ProfileCard = () => {
  const { userData } = useHunter();
  const { totalTry, totalSuccess } = userData;

  const fail = totalTry - totalSuccess;

  return (
    <Card>
      <img
        src="images/hunter/PolygalacticHunterLogo.png"
        width={297}
        alt="Game"
      />
      <Text>Profile Statistics</Text>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#2D3A4A">
          Total Missions:
        </Text>
        <Text color="#00649B" bold style={{ fontSize: "18px" }}>
          {totalTry}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#2D3A4A">
          Missions Successful:
        </Text>
        <Text color="#00649B" bold style={{ fontSize: "18px" }}>
          {totalSuccess}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#2D3A4A">
          Missions Failed:
        </Text>
        <Text color="#00649B" bold style={{ fontSize: "18px" }}>
          {fail}
        </Text>
      </Flex>
    </Card>
  );
};

export default ProfileCard;
