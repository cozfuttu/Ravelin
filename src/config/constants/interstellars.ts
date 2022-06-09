import { InterstellarConfig } from "./types";

const interstellars: InterstellarConfig[] = [
  {
    name: "RAV-multiUSDC",
    contractAddress: "0x1A24ffBD2C5090ACC33393AD9b13207D5Dd4142E",
    stakeLpAddress: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
    rewardLpAddress: "0xB56964a0617b2b760C8B6D8040e99cda29D5203b",
    stakeTokenSymbol: "RAV",
    rewardTokenSymbol: "multiUSDC",
  },
  {
    name: "RAV-mADA",
    contractAddress: "0xb4690c222D8222fd662aF209FB2298dFFf1c6B04", // change when deployed the contract
    stakeLpAddress: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
    rewardLpAddress: "0xB56964a0617b2b760C8B6D8040e99cda29D5203b",
    stakeTokenSymbol: "RAV-mADA",
    rewardTokenSymbol: "wADA",
    isStakeLP: true,
    lpSource: "Occam",
    partnerName: "TRUST Pool",
    partnerWebsite: "",
  },
];

export default interstellars;
