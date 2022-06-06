import BigNumber from "bignumber.js";

const LAST_MISSION_TIME = "mission active: ";

const checkLastMissionStatus = (account: string, endPoint = "") => {
  const dataSavingKey = LAST_MISSION_TIME + account + endPoint;
  const missionStartTime = localStorage.getItem(dataSavingKey) ?? "";

  const isLastMissionViewed = missionStartTime === null;
  const isLastMissionReadyToReveal = new BigNumber(
    missionStartTime
  ).isGreaterThan(Math.round(Date.now() / 1000));

  return {
    dataSavingKey,
    missionStartTime,
    isLastMissionViewed,
    isLastMissionReadyToReveal,
  };
};

export default checkLastMissionStatus;
