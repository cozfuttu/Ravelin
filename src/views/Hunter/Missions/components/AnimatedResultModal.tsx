/* eslint react/jsx-curly-brace-presence: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint react-hooks/exhaustive-deps: "off" */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Button, useMatchBreakpoints, Text } from "uikit";
import ModalActions from "components/ModalActions";
import getCombatData, {
  INITIAL_FIGHTER_HEALTH,
  MAX_COMBAT_TURN_COUNT,
} from "../utils/CombatLogic";
import {
  HealthStatus,
  BugCountText,
  CombatCounter,
} from "./CombatHealthStatus";
import MissionStatusBar from "./MissionStatusBar";

interface GameInfoModalProps {
  missionResult: string;
  reward: string;
  rewardTokenSymbol: string;
  hunterName: string;
  onCloseModal?: () => void;
  onDismiss?: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 32px;
  max-width: 800px;
  width: 90vw;
  max-height: 800px;
  box-shadow: 0px 0px 30px 10px #00e0a0;
`;

const HealthContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  justify-content: space-between;
  align-content: flex-end;
  flex-wrap: "wrap";
  height: 80px;
`;

const ANIMATION_DURATION = 3050;
const INITIAL_TIME_REMAINING =
  Math.round((MAX_COMBAT_TURN_COUNT * ANIMATION_DURATION) / 1000) - 1;

const GameConclusionModal: React.FC<GameInfoModalProps> = ({
  missionResult,
  reward,
  rewardTokenSymbol,
  hunterName,
  onCloseModal,
  onDismiss,
}) => {
  const [combatState, setCombatState] = useState([]);
  const [combatIndex, setCombatIndex] = useState(0);

  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;

  useEffect(() => {
    const _combatData = getCombatData(missionResult);

    setCombatState(_combatData);
  }, [missionResult]);

  useEffect(() => {
    const intervalForAnimationPlay = setTimeout(() => {
      if (combatIndex + 1 < combatState.length) {
        setCombatIndex(combatIndex + 1);
      }
    }, ANIMATION_DURATION);

    return () => {
      clearInterval(intervalForAnimationPlay);
    };
  });

  const handleCloseModal = () => {
    onDismiss();

    if (onCloseModal) {
      onCloseModal();
    }
  };

  const combatFinished = combatIndex + 1 === combatState.length

  const gifSrc = combatState?.length
    ? `/images/hunter/missionGifs/${combatState[combatIndex].animationName}.webp`
    : "";

  const rewardResult = (missionResult === "2" ? "Mediocre Success:" : missionResult === "3" ? "Success: " : missionResult === "4" ? "Great Success: " : "You lost. RIP ") + `${missionResult !== "1" ? reward + ' ' + rewardTokenSymbol.toUpperCase() : hunterName}`

  return (
    <Container>
      <Modal
        title="Mission Result"
        onDismiss={handleCloseModal}
        bodyPadding="12px 32px"
      >
        {!isMobile ? (
          <div>
            <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
              <CombatCounter
                initialTime={INITIAL_TIME_REMAINING}
                isDead={
                  combatState?.length
                    ? combatState[combatIndex].newHealths[0] <= 0
                    : false
                }
              />
            </div>

            <HealthContainer>
              <HealthStatus
                health={
                  combatState?.length
                    ? combatState[combatIndex].newHealths[0]
                    : INITIAL_FIGHTER_HEALTH
                }
                hunterName={hunterName}
                attackStyle={
                  combatState?.length ? combatState[combatIndex].id : null
                }
              />
              <BugCountText
                bugCount={
                  combatState?.length
                    ? combatState[combatIndex].newHealths[1]
                    : 0
                }
                attackStyle={
                  combatState?.length ? combatState[combatIndex].id : null
                }
              />
              {combatState?.length && (
                <MissionStatusBar
                  health={combatState[combatIndex].oldHealths[0]}
                  bugCount={combatState[combatIndex].oldHealths[1]}
                />
              )}
            </HealthContainer>
          </div>
        ) : (
          <HealthStatus
            health={
              combatState?.length
                ? combatState[combatIndex].newHealths[0]
                : INITIAL_FIGHTER_HEALTH
            }
            hunterName="Hunter"
            attackStyle={
              combatState?.length ? combatState[combatIndex].id : null
            }
          />
        )}

        <div
          style={{
            marginTop: "5px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <img
            src={gifSrc}
            alt="h"
            loading="eager"
            hidden={combatFinished}
            style={{ maxWidth: isMobile && "320px" }}
          />
          <img
            src={`/images/hunter/missionGifs/${missionResult === "1" ? "HunterEndDead" : "HunterEndAlive"
              }.webp`}
            alt="haa"
            loading="eager"
            hidden={!combatFinished}
            style={{ maxWidth: isMobile && "320px" }}
          />
        </div>

        {isMobile && (
          <HealthContainer>
            <BugCountText
              bugCount={
                combatState?.length ? combatState[combatIndex].newHealths[1] : 0
              }
              attackStyle={
                combatState?.length ? combatState[combatIndex].id : null
              }
            />
            {combatState?.length && (
              <MissionStatusBar
                health={combatState[combatIndex].oldHealths[0]}
                bugCount={combatState[combatIndex].oldHealths[1]}
              />
            )}
          </HealthContainer>
        )}
        {isMobile && (
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CombatCounter
              initialTime={INITIAL_TIME_REMAINING}
              isDead={
                combatState?.length
                  ? combatState[combatIndex].newHealths[0] <= 0
                  : false
              }
            />
          </div>
        )}

        <ModalActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </ModalActions>
        {!isMobile && <Text bold color={missionResult === "1" ? "#ff2121" : "#00d200"} style={{ opacity: combatFinished ? "1" : "0", transition: "all 500ms linear", position: "absolute", right: "64px", bottom: "64px" }}>{rewardResult}</Text>}
      </Modal>
    </Container>
  );
};

export default GameConclusionModal;
