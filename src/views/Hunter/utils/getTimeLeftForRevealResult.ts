import { DateTime } from "luxon";

const getTimeLeftForRevealResult = (
  currentTimeMilis: number,
  started: number
) => {
  const lNow = DateTime.fromMillis(currentTimeMilis).setZone("utc");
  const lTarget = DateTime.fromMillis(started * 1000 + 15000).setZone("utc");
  const timeDiff = lTarget.diff(lNow).shiftTo("minutes", "seconds");
  const remainingTime = timeDiff.toFormat("mm:ss");

  return timeDiff.seconds >= 0 ? remainingTime : "00:00";
};

export default getTimeLeftForRevealResult;
