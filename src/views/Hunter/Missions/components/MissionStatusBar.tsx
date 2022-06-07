/* eslint no-nested-ternary: "off" */
/* eslint react-hooks/exhaustive-deps: "off" */

import React from "react";
import styled from "styled-components";
import { Text } from "uikit";
import {
  MIN_BUG_COUNT_MEDICORE_SUCCESS,
  MIN_BUG_COUNT_SUCCESS,
  MIN_BUG_COUNT_GREAT_SUCCESS,
} from "../utils/CombatLogic";

interface ContainerProps {
  color?: string;
}

const IconContainer = styled.div<ContainerProps>`
  display: flex;
  height: 35px;
  max-height: 10vw;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${(props) => props.color};
  margin-left: 5px;
  margin-right: 5px;
  box-shadow: ${(props) => `${props.color} 0px 0px 2px 1px`};
`;

const Image = styled.img`
  width: 100%;
  transition: opacity 2s linear;
  height: 100%;
  object-fit: cover;
`;

interface CombatTextProps {
  health: number;
  bugCount: number;
}

const MissionStatusBar: React.FC<CombatTextProps> = ({
  health = 100,
  bugCount,
}) => {
  const price1Image =
    health >= 0 &&
    bugCount >= MIN_BUG_COUNT_MEDICORE_SUCCESS &&
    bugCount < MIN_BUG_COUNT_SUCCESS
      ? "/images/hunter/missionIcons/prize_1_win.png"
      : "/images/hunter/missionIcons/prize_1.png";
  const price2Image =
    health >= 0 &&
    bugCount >= MIN_BUG_COUNT_SUCCESS &&
    bugCount < MIN_BUG_COUNT_GREAT_SUCCESS
      ? "/images/hunter/missionIcons/prize_2_win.png"
      : "/images/hunter/missionIcons/prize_2.png";
  const price3Image =
    health >= 0 && bugCount >= MIN_BUG_COUNT_GREAT_SUCCESS
      ? "/images/hunter/missionIcons/prize_3_win.png"
      : "/images/hunter/missionIcons/prize_3.png";

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}
    >
      <div>
        <Text style={{ textAlign: "center" }}>
          {MIN_BUG_COUNT_MEDICORE_SUCCESS}
        </Text>
        <IconContainer>
          <Image src={price1Image} />
        </IconContainer>
      </div>
      <div>
        <Text style={{ textAlign: "center" }}>{MIN_BUG_COUNT_SUCCESS}</Text>
        <IconContainer>
          <Image src={price2Image} />
        </IconContainer>
      </div>
      <div>
        <Text style={{ textAlign: "center" }}>
          {MIN_BUG_COUNT_GREAT_SUCCESS}
        </Text>
        <IconContainer>
          <Image src={price3Image} />
        </IconContainer>
      </div>
    </div>
  );
};

export default MissionStatusBar;
