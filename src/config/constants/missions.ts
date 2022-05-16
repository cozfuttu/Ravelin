import { lpAddresses } from "./addresses";
import { HunterMissionConfig } from "./types";

const missionConfig: HunterMissionConfig[] = [
  {
    missionId: 0,
    name: "Protect the King!",
    description: "You shall protect him at all cost!",
    imageUri: "",
    detailsImageUri: "",
    playableWith: "rav",
    gain: "rshare",
    lpAddressOfPaidToken: lpAddresses.ravMada,
    lpAddressOfEarnedToken: lpAddresses.rshareMada,
  },
];

export default missionConfig;
