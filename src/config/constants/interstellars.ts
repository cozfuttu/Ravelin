import { InterstellarConfig } from "./types";

const interstellars: InterstellarConfig[] = [
  /*   {
      name: "RAV-multiUSDC",
      contractAddress: "0x1A24ffBD2C5090ACC33393AD9b13207D5Dd4142E",
      stakeLpAddress: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
      rewardLpAddress: "0xB56964a0617b2b760C8B6D8040e99cda29D5203b",
      stakeTokenSymbol: "RAV",
      rewardTokenSymbol: "multiUSDC",
    }, */
  /*   {
      name: "RAV-mADA",
      contractAddress: "0xb4690c222D8222fd662aF209FB2298dFFf1c6B04",
      stakeLpAddress: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
      rewardLpAddress: "0xB56964a0617b2b760C8B6D8040e99cda29D5203b",
      stakeTokenSymbol: "RAV-mADA",
      rewardTokenSymbol: "wADA",
      isStakeLP: true,
      lpSource: "Occam",
      partnerName: "TRUST Pool",
      partnerWebsite: "",
    }, */
  /*   {
      name: "RAV-mADA",
      contractAddress: "0x77aB41738d9dF3d0B42AdD75DC6243db18dcd36C",
      stakeLpAddress: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
      rewardLpAddress: "0xB56964a0617b2b760C8B6D8040e99cda29D5203b",
      stakeTokenSymbol: "RAV",
      rewardTokenSymbol: "wADA",
      partnerName: "TRUST Pool",
      partnerWebsite: "",
    },
    {
      name: "TPGX-mADA/TPGX",
      contractAddress: "0x37e2a5F3f3585F3db70e0fC7d84015C8dca9D18b",
      stakeLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
      rewardLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
      stakeTokenSymbol: "TPGX-mADA",
      rewardTokenSymbol: "TPGX",
      isStakeLP: true,
      partnerName: "TRUST Pool",
      partnerWebsite: "",
      lpSource: "Occam",
    }, */
  /*{
    name: "TPGX-RAV/RAV",
    contractAddress: "0x8Fc6C4D3B07CAcF14C5eCD193F5513DAFBA6ff53",
    stakeLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
    rewardLpAddress: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
    stakeTokenSymbol: "TPGX-RAV",
    rewardTokenSymbol: "RAV",
    isStakeLP: true,
    partnerName: "TRUST Pool",
    partnerWebsite: "",
    lpSource: "Occam",
  },*/
  {
    name: "RAV-mADA/TPGX",
    contractAddress: "0xa94f0F7E08403085e25555b3f14a2A3e6b4138d7",
    stakeLpAddress: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
    rewardLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
    stakeTokenSymbol: "RAV-mADA",
    rewardTokenSymbol: "TPGX",
    isStakeLP: true,
    partnerName: "TRUST Pool",
    partnerWebsite: "",
    lpSource: "Occam",
  },
  {
    name: "RSHARE-mADA/TPGX",
    contractAddress: "0x8567aE9460A2f03D8C2523DAC85C41e7F479d03c",
    stakeLpAddress: "0x73bc306Aa2D393ff5aEb49148b7B2C9a8E5d39c8",
    rewardLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
    stakeTokenSymbol: "RSHARE-mADA",
    rewardTokenSymbol: "TPGX",
    isStakeLP: true,
    partnerName: "TRUST Pool",
    partnerWebsite: "",
    lpSource: "Occam",
  },
  {
    name: "TPGX-RAV/TPGX",
    contractAddress: "0x04b11f68EfBb88c50Abed80903F19897e6f16CAc",
    stakeLpAddress: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
    rewardLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
    stakeTokenSymbol: "TPGX-RAV",
    rewardTokenSymbol: "TPGX",
    isStakeLP: true,
    partnerName: "TRUST Pool",
    partnerWebsite: "",
    lpSource: "Occam",
  },
  {
    name: "TPGX-RSHARE/TPGX",
    contractAddress: "0xF4c34125372e40016aF689e0EE0e3160372E2E7A",
    stakeLpAddress: "0x73bc306Aa2D393ff5aEb49148b7B2C9a8E5d39c8",
    rewardLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
    stakeTokenSymbol: "TPGX-RSHARE",
    rewardTokenSymbol: "TPGX",
    isStakeLP: true,
    partnerName: "TRUST Pool",
    partnerWebsite: "",
    lpSource: "Occam",
  },
  {
    name: "TPGX/TPGX",
    contractAddress: "0xa9f534E267D4c9307DCc2f7Bfafd5a58b8ecb8F3",
    stakeLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
    rewardLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
    stakeTokenSymbol: "TPGX",
    rewardTokenSymbol: "TPGX",
    partnerName: "TRUST Pool",
    partnerWebsite: "",
  },
  /*{
    name: "TPGX/BUSD",
    contractAddress: "0x7f3f0f05cbb7DbB0fAd16965044BC3B5116660Af",
    stakeLpAddress: "0x814FfE50952d4D8F0483910Af2B891f03d46BD35",
    rewardLpAddress: "0xE708fd444CAEf29E2004923cc29Ac4Aef006c9E9",
    stakeTokenSymbol: "TPGX",
    rewardTokenSymbol: "BUSD",
    partnerName: "TRUST Pool",
    partnerWebsite: "",
  },*/
];

export default interstellars;
