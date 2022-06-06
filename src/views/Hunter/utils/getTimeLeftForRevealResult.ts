import { DateTime } from "luxon";

const getTimeLeftForRevealResult = (
  currentTimeMilis: number,
  started: number
) => {
  const lNow = DateTime.fromMillis(currentTimeMilis).setZone("utc");
  const lTarget = DateTime.fromMillis(started * 1000).setZone("utc");
  const timeDiff = lNow.diff(lTarget).shiftTo("seconds");
  const remainingTime = timeDiff.seconds;

  return remainingTime;
};

export default getTimeLeftForRevealResult;
