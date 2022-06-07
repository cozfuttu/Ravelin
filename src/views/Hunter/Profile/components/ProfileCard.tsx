import React from "react";
import { useHunter } from "state/hooks";
import styled from "styled-components";
import { Flex, Text } from "uikit";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 32px;
  text-align: center;
  background-color: #000000bb;
  border: 3px solid #165b54;
  border-radius: 8px;
  max-width: 400px;
`;

const ProfileCard = () => {
  const { userData } = useHunter();
  const { totalTry, totalSuccess, maxNftLevel } = userData;

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
        <Text style={{ fontSize: "18px" }} color="#9fffe7">
          Total Missions:
        </Text>
        <Text bold style={{ fontSize: "18px" }}>
          {totalTry}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#9fffe7">
          Missions Successful:
        </Text>
        <Text bold style={{ fontSize: "18px" }}>
          {totalSuccess}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#9fffe7">
          Missions Failed:
        </Text>
        <Text bold style={{ fontSize: "18px" }}>
          {fail}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#9fffe7">
          Maximum Hunter Level :
        </Text>
        <Text bold style={{ fontSize: "18px" }}>
          {maxNftLevel}
        </Text>
      </Flex>
    </Card>
  );
};

export default ProfileCard;
