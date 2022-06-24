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
import { isDev } from "config/constants/addresses";

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

const REWARD_LIMIT_MULTIPLIER = 8;

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
      requiredRarity,
      xp,
      missionId
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

    const priceValueFormatted = price
      ? `${Number(price).toLocaleString("en", {
        maximumFractionDigits: 5,
      })} ${priceTokenName}`
      : "Free!";

    const rewardLeftFormatted =
      Number(isRewardFinished ? 0 : rewardLeft) >= 1e9
        ? `${rewardLeft / 1e9} Bil ${rewardTokenName}`
        : rewardLeft
          ? `${Number(isRewardFinished ? 0 : rewardLeft).toLocaleString("en", {
            maximumFractionDigits: 5,
          })} ${rewardTokenName}`
          : "-";

    const xpModifier = xp / (requiredRarity * 10)
    const isDeveloper = isDev(account);

    return (
      <NCard>
        <StyledImage src={imageUri} />
        <Heading
          style={{ fontSize: "20px", textAlign: "center" }}
          color="#2D3A4A"
        >
          CROP INFESTATION
        </Heading>
        <Divider />
        <InfoContainer>
          {isDeveloper &&
            <Flex justifyContent="space-between">
              <Text
                style={{ fontSize: "16px", textAlign: "start" }}
                color="#2D3A4A"
                bold
              >
                Mission Id:
              </Text>
              <Text
                color="#00649B"
                bold
                style={{ fontSize: "16px", textAlign: "end" }}
              >
                {missionId}
              </Text>
            </Flex>
          }
          <Flex justifyContent="space-between">
            <Text
              style={{ fontSize: "16px", textAlign: "start" }}
              color="#2D3A4A"
              bold
            >
              Cost:
            </Text>
            <Text
              color="#00649B"
              bold
              style={{ fontSize: "16px", textAlign: "end" }}
            >
              {priceValueFormatted}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              style={{ fontSize: "16px", textAlign: "start" }}
              color="#2D3A4A"
              bold
            >
              Mediocre Success:
            </Text>
            <Text
              color="#00649B"
              bold
              style={{ fontSize: "16px", textAlign: "end" }}
            >
              {mediocreReward}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              style={{ fontSize: "16px", textAlign: "start" }}
              color="#2D3A4A"
              bold
            >
              Success:
            </Text>
            <Text
              color="#00649B"
              bold
              style={{ fontSize: "16px", textAlign: "end" }}
            >
              {successReward}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              style={{ fontSize: "16px", textAlign: "start" }}
              color="#2D3A4A"
              bold
            >
              Great Success:
            </Text>
            <Text
              color="#00649B"
              bold
              style={{ fontSize: "16px", textAlign: "end" }}
            >
              {greatReward}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" style={{ width: "100%" }}>
            <Text style={{ fontSize: "16px" }} color="#2D3A4A" bold>
              Reward Distributed:
            </Text>
            <Text
              color="#00649B"
              bold
              style={{ fontSize: "16px", textAlign: "end" }}
            >
              {totalRewardFormatted}
            </Text>
          </Flex>
          {isDeveloper &&
            <Flex justifyContent="space-between" style={{ width: "100%" }}>
              <Text style={{ fontSize: "16px" }} color="#2D3A4A" bold>
                Reward Left:
              </Text>
              <Text
                color="#00649B"
                bold
                style={{ fontSize: "16px", textAlign: "end" }}
              >
                {rewardLeftFormatted}
              </Text>
            </Flex>
          }
          <Flex justifyContent="space-between" style={{ width: "100%" }}>
            <Text style={{ fontSize: "16px" }} color="#2D3A4A" bold>
              Cooldown:
            </Text>
            <Text
              color="#00649B"
              bold
              style={{ fontSize: "16px", textAlign: "end" }}
            >
              {cooldownText}
            </Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            style={{ width: "100%" }}
            mb="2vh"
          >
            <Text style={{ fontSize: "16px" }} color="#2D3A4A" bold>
              Level Requirement:
            </Text>
            <Text
              color="#00649B"
              bold
              style={{ fontSize: "16px", textAlign: "end" }}
            >
              {25 * (requiredRarity - 1) + 1}
            </Text>
          </Flex>
          <Flex
            style={{ width: "100%" }}
            mb="2vh"
          >
            {xpModifier !== 1 && <Text style={{ fontSize: "16px", textAlign: 'center' }} color="#009500" bold>
              BONUS XP: {xpModifier}x
            </Text>}
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
