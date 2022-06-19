import React from "react";
import styled from "styled-components";
import { useHunter } from "state/hooks";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import getNameByRarity from "../utils/getNameByRarity";
import { Flex, Text } from "uikit";
import CardActions from "./CardActions";
import XpBar from "./XPBar";

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

/* allowanceHunter: BigNumber;
allowanceMission: BigNumber;
tokenId: number;
maxNftLevel: number;
totalTry: number;
totalSuccess: number;
totalReward: number;
userHasHunter: boolean;
hunterName: string;
hunterLevel: number;
hunterRarity: number;
hunterXp: number;
hunterNeedXpToLevelUp: number;
hunterTotalXp: number;
hunterOwner: string;
hunterCreator: string;
hunterTotalTry: number;
hunterTotalSuccess: number;
hunterNextTryBlock: number;
hunterNextTryTime: number;
hunterInMission: boolean; */

const HunterImage = styled.img`
  max-width: 300px;
  align-self: center;
`;

const HunterCard = () => {
  const { userData, hunterPrice } = useHunter();
  const {
    userHasHunter,
    hunterName,
    hunterLevel,
    hunterRarity,
    hunterXp,
    hunterNeedXpToLevelUp,
    hunterTotalSuccess,
  } = userData;
  const { account } = useWallet();

  const imageUri = `images/hunter/characterImages/PolygalacticHunter${hunterRarity}.webp`;
  const nameByRarity = getNameByRarity(hunterRarity);

  if (!userHasHunter)
    return (
      <Card>
        <HunterImage
          src="images/hunter/characterImages/PolygalacticHunter4.webp"
          alt="Hunter Image"
        />
        <Text color="#2D3A4A">This hunter is on a hunt for various tokens.</Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="#2D3A4A" bold>Price: </Text>
          <Text color="#2D3A4A" bold style={{ display: "flex", alignItems: "center" }}>
            {hunterPrice}&nbsp;{" "}
            <img src="/images/icons/rav.png" width={32} alt="RAV" />
          </Text>
        </Flex>
        <CardActions account={account} />
      </Card>
    );

  return (
    <Card>
      <HunterImage src={imageUri} alt="Hunter Image" />
      <Flex justifyContent="center" marginTop="16px" marginBottom="16px">
        <Text style={{ fontSize: "32px" }} color="#2D3A4A" bold>
          {hunterName}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#2D3A4A">
          Rarity:
        </Text>
        <Text color="#00649B" bold style={{ fontSize: "18px" }}>
          {nameByRarity}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#2D3A4A">
          Level:
        </Text>
        <Text color="#00649B" bold style={{ fontSize: "18px" }}>
          {hunterLevel}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#2D3A4A">
          Until Next Level:
        </Text>
        <XpBar xp={hunterXp} needXpToLevelUp={hunterNeedXpToLevelUp} />
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: "18px" }} color="#2D3A4A">
          Missions Completed:
        </Text>
        <Text color="#00649B" bold style={{ fontSize: "18px" }}>
          {hunterTotalSuccess}
        </Text>
      </Flex>
    </Card>
  );
};

export default HunterCard;
