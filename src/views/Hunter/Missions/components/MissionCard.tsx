/* eslint react-hooks/exhaustive-deps: "off" */
/* eslint no-unneeded-ternary: "off" */
/* eslint no-nested-ternary: "off" */
import React, { memo } from "react";
import styled from "styled-components";
import { Heading, Text, Flex } from "uikit";
import { HunterMissionData } from "state/types";
import CardActions from "./CardActions";
import calculateCooldown from "views/Hunter/utils/calculateCooldown";
import calculateRewards from "views/Hunter/utils/calculateRewards";

const NCard = styled.div`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  background: rgba(45, 58, 74, 0.15);
  max-width: 300px;
  box-shadow: 0 6px 10px -4px #646464;

  @media (max-width: 1080px) {
    max-width: 300px;
    max-height: 900px;
    margin-left: 5%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: -16px;
  gap: 0.5vh;
`;

const StyledImage = styled.img`
  max-width: 300px;
  align-self: center;
`;

const Divider = styled.div`
  width: 90%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(122, 122, 122, 0.4) 0%,
    rgba(70, 79, 90, 0.15) 50%,
    rgba(122, 122, 122, 0.4) 100%
  );
  align-self: center;
`;

interface MissionCardProps {
  missionInfo: HunterMissionData | null;
  account: string;
}

const REWARD_LIMIT_MULTIPLIER = 24;

const MissionCard: React.FC<MissionCardProps> = memo(
  ({ missionInfo, account }) => {
    const {
      canBeThey,
      price,
      reward,
      totalReward,
      balanceOfTokenInContract: rewardLeft,
      playableWith,
      gain,
      cooldown,
      imageUri,
      name,
      requiredRarity,
    } = missionInfo;
    const priceTokenName = playableWith.toUpperCase() || "";
    const rewardTokenName = gain.toUpperCase() || "";
    const cooldownText = calculateCooldown(cooldown);
    const { mediocreReward, successReward, greatReward } = calculateRewards(
      reward,
      rewardTokenName
    );

    const isRewardFinished = rewardLeft <= reward * REWARD_LIMIT_MULTIPLIER;

    const totalRewardFormatted =
      Number(totalReward) >= 1e9
        ? `${reward / 1e9} Bil ${rewardTokenName}`
        : totalReward
        ? `${Number(totalReward).toLocaleString("en", {
            maximumFractionDigits: 5,
          })} ${rewardTokenName}`
        : "-";

    const rewardLeftFormatted =
      Number(isRewardFinished ? 0 : rewardLeft) >= 1e9
        ? `${rewardLeft / 1e9} Bil ${rewardTokenName}`
        : rewardLeft
        ? `${Number(isRewardFinished ? 0 : rewardLeft).toLocaleString("en", {
            maximumFractionDigits: 5,
          })} ${rewardTokenName}`
        : "-";

    const priceValueFormatted = price
      ? `${Number(price).toLocaleString("en", {
          maximumFractionDigits: 5,
        })} ${priceTokenName}`
      : "-";

    return (
      <NCard>
        <StyledImage src={imageUri} />
        <Heading
          style={{ fontSize: "20px", textAlign: "center" }}
          color="#2D3A4A"
        >
          {name.toUpperCase()}
        </Heading>
        <Divider />
        <InfoContainer>
          <Flex justifyContent="space-between">
            <Text
              style={{ fontSize: "16px", textAlign: "start" }}
              color="#00E0A0"
            >
              Cost:
            </Text>
            <Text bold style={{ fontSize: "16px", textAlign: "end" }}>
              {priceValueFormatted}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              style={{ fontSize: "16px", textAlign: "start" }}
              color="#00E0A0"
            >
              Mediocre Success:
            </Text>
            <Text bold style={{ fontSize: "16px", textAlign: "end" }}>
              {mediocreReward}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              style={{ fontSize: "16px", textAlign: "start" }}
              color="#00E0A0"
            >
              Success:
            </Text>
            <Text bold style={{ fontSize: "16px", textAlign: "end" }}>
              {successReward}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              style={{ fontSize: "16px", textAlign: "start" }}
              color="#00E0A0"
            >
              Great Success:
            </Text>
            <Text bold style={{ fontSize: "16px", textAlign: "end" }}>
              {greatReward}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" style={{ width: "100%" }}>
            <Text style={{ fontSize: "16px" }} color="#00E0A0">
              Reward Distributed:
            </Text>
            <Text bold style={{ fontSize: "16px", textAlign: "end" }}>
              {totalRewardFormatted}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" style={{ width: "100%" }}>
            <Text style={{ fontSize: "16px" }} color="#00E0A0">
              Rewards Left:
            </Text>
            <Text bold style={{ fontSize: "16px", textAlign: "end" }}>
              {rewardLeftFormatted}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" style={{ width: "100%" }}>
            <Text style={{ fontSize: "16px" }} color="#00E0A0">
              Cooldown:
            </Text>
            <Text bold style={{ fontSize: "16px", textAlign: "end" }}>
              {cooldownText}
            </Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            style={{ width: "100%" }}
            mb="2vh"
          >
            <Text style={{ fontSize: "16px" }} color="#00E0A0">
              Level Required to Play:
            </Text>
            <Text bold style={{ fontSize: "16px", textAlign: "end" }}>
              {25 * (requiredRarity - 1) + 1}
            </Text>
          </Flex>
          {/*           <Flex justifyContent="center" style={{ width: '100%' }} mb='2vh'>
            {buyLink}
          </Flex> */}
        </InfoContainer>
        <CardActions
          mission={missionInfo}
          account={account}
          isRewardFinished={isRewardFinished}
          canBeThey={canBeThey}
        />
      </NCard>
    );
  }
);

export default MissionCard;
