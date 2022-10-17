const devAddresses = [
  "0xff4d7E3F29A894A23f4d561575c9F47af54DD00b",
  "0x138A31Ff3549adD7f31ecf4026F19C511ED675D5",
];

export const isDev = (account: string) =>
  devAddresses.find((address) => account === address) !== undefined;

export const tokenAddresses = {
  rav: "0x9B7c74Aa737FE278795fAB2Ad62dEFDbBAedFBCA",
  rshare: "0xD81E377E9cd5093CE752366758207Fc61317fC70",
  rbond: "0xf1F1E08844E9AC3DadcBba349D6D93F1FCaC651f",
  wADA: "0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9",
  tpgx: "0xA325ad468dF2676f195A623899953C192E354AE8",
  multiUSDC: "0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
  multiUSDT: "0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844",
  multiOCC: "0x461d52769884ca6235B685EF2040F47d30C94EB5",
  ceUSDC: "0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98",
  ceUSDT: "",
  ceWBTC: "",
  ceWETH: "",
  madUSDC: "",
  madUSDT: "",
  madWBTC: "",
  madWETH: "",
  milk: "",
  milky: "",
  tusdt: "0xB35B6435d550af0f11433385ADB9aCa29BdcBCFb",
  busdt: "0x8930409112B56154d821f395A0Ad1f6e5823Fa00",
};

export const lpAddresses = {
  ravMada: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
  rshareMada: "0x73bc306Aa2D393ff5aEb49148b7B2C9a8E5d39c8",
  multiusdcMada: "0xB56964a0617b2b760C8B6D8040e99cda29D5203b", // use this to get mADA price (deepest liquidity, safer).
  multiusdtMada: "0xA74A72b796b94a215BF618b89C786b9240fd04EF", // or this.
  multiwbtcMada: "",
  multiethMada: "",
  ceusdcMada: "0x0724626A353302e74b88E52871D0e99A7bd2Ed79",
  ceusdtMada: "",
  cewbtcMada: "",
  cewethMada: "",
  madusdcMada: "",
  madusdtMada: "",
  madwbtcMada: "",
  madwethMada: "",
  milkMada: "",
  milkyMada: "",

  multiusdcMultiusdt: "0xA4AD48A0b25460d31aE12291620fB063E1A6Db13",
  ceusdcCeusdt: "0xd6410e0b55D5800E10Bf25a6349749A7aaD0F376",

  ravRshare: "0xb2a902354579424a0E9f2fcf1f3640DAA8ACD3b2",

  tusdtMada: "0x9e45FeD59d4De3b00C0D8BFeB8EC8d7E7c0F115c",
  busdtMada: "0x606fCB906b01f98a16b625F3cb14E636d0E20D44",
};

export default devAddresses;
