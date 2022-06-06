import { DateTime } from "luxon";

const getTimeLeftForNextMission = (
  currentTimeMilis: number,
  nextPlayTime: number
) => {
  const lNow = DateTime.fromMillis(currentTimeMilis).setZone("utc");
  const lTarget = DateTime.fromMillis(nextPlayTime * 1000).setZone("utc");
  const timeDiff = lTarget
    .diff(lNow)
    .shiftTo("days", "hours", "minutes", "seconds");
  const timeDiffFormatted = timeDiff.toFormat("dd:hh:mm:ss");

  return timeDiffFormatted;
};

export default getTimeLeftForNextMission;
