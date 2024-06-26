/* const TEST_CONTRACTS = {
  cake: {
    137: '0x1d9d6B3B02eA3411d34d1bd625F47CacbC632437',
    97: '',
  },
  bounty: {
    137: '0x9FbC97cef091eBC34631401C6B18D924c8aE5F66',
    97: '',
  },
  masterChef: {
    137: '0xE9b9ECe2fAc5b9b0AaFFea2d358eCB13Ab8BE9dA',
    97: '',
  },
  wbnb: {
    137: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // MATIC
    97: '',
  },
  lottery: {
  137: '',
    97: '',
  },
  lotteryNFT: {
    137: '',
    97: '',
  },
  multiCall: {
    137: '0x43940EFD89264E4041c8BF07169941dd0435c085',
    97: '0x672C34D10e34e3d5D639b7710C5cEd4E0827F3bA',
  },
  busd: {
    137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    97: '',
  },
  nft: {
    137: '0x306484984e83c36B2946419C589b46068fCBA7f6',
    97: '',
  },
  game: {
    137: '0xB743285D3254C3c3Ad00338DC6464a75a8da5f51',
    97: '',
  },
  polygalacticHunter: {
    137: '0xbbD26d6d7aee63E605899a173Df72F609C08A751',
    97: '',
  },
  petPvp: {
    137: '0x4B19e944fCc11285C79BA5BAB3BF9EB7Edd41392',
    97: '',
  },
  rewardDistribution: {
    137: '0x424C1b0260A37d77b6eE54B0F50Ed47487A7c0b3',
    97: '',
  },
  pulsarMaticLp: {
    137: '0xc6fCd85DDd4A301C9BabFfeFC07dAdDDf7b413a4',
    97: '',
  },
  bountyMaticLp: {
    137: '0xD883C361D1E8a7e1f77D38E0a6e45D897006B798',
    97: '',
  },
  iceTicket: {
    137: '0xf90F32Ed5cAF6BcFb23BAe607b60c00332C259c3',
    97: '',
  }
} */

const PRODUCTION_CONTRACTS = {
  wbnb: {
    2001: "0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9",
    250: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    137: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", // MATIC
    97: "",
  },
  multiCall: {
    2001: "0x93E5f549327baB41a1e33daEBF27dF27502CC818",
    250: "0xb828C456600857abd4ed6C32FAcc607bD0464F4F",
    137: "0x43940EFD89264E4041c8BF07169941dd0435c085",
    97: "0x672C34D10e34e3d5D639b7710C5cEd4E0827F3bA",
  },
  busd: {
    2001: "0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
    250: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    137: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    97: "",
  },
  usdt: {
    2001: "0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844",
    250: "",
    137: "",
    97: "",
  },
  multiUsdt: {
    2001: "0x3795C36e7D12A8c252A20C5a7B455f7c57b60283",
    250: "",
    137: "",
    97: "",
  },
  rav: {
    2001: "0x9B7c74Aa737FE278795fAB2Ad62dEFDbBAedFBCA",
    250: "0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7",
    137: "0x40ed0565eCFB14eBCdFE972624ff2364933a8cE3",
    97: "",
  },
  rbond: {
    2001: "0xf1F1E08844E9AC3DadcBba349D6D93F1FCaC651f",
    250: "0x24248CD1747348bDC971a5395f4b3cd7feE94ea0",
    137: "0x40ed0565eCFB14eBCdFE972624ff2364933a8cE3",
    97: "",
  },
  rshare: {
    2001: "0xD81E377E9cd5093CE752366758207Fc61317fC70",
    250: "0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37",
    137: "0x40ed0565eCFB14eBCdFE972624ff2364933a8cE3",
    97: "",
  },
  ravNativeLP: {
    2001: "0xd65005ef5964b035B3a2a1E79Ddb4522196532DE",
    250: "0x2A651563C9d3Af67aE0388a5c8F89b867038089e",
    137: "0xc6fcd85ddd4a301c9babffefc07dadddf7b413a4",
    97: "",
  },
  rshareNativeLP: {
    2001: "0x73bc306Aa2D393ff5aEb49148b7B2C9a8E5d39c8",
    250: "0x4733bc45eF91cF7CcEcaeeDb794727075fB209F2",
    137: "0xc6fcd85ddd4a301c9babffefc07dadddf7b413a4",
    97: "",
  },
  ravRshareLP: {
    2001: "0xb2a902354579424a0E9f2fcf1f3640DAA8ACD3b2",
    250: "0x4733bc45eF91cF7CcEcaeeDb794727075fB209F2",
    137: "0xc6fcd85ddd4a301c9babffefc07dadddf7b413a4",
    97: "",
  },
  genesisPools: {
    2001: "0xe33Eb50f21708348b759140E83637571b538f910",
    250: "0x9A896d3c54D7e45B558BD5fFf26bF1E8C031F93b",
    137: "0xA375495919205251a05f3B259B4D3cc30a4d3ED5",
    97: "",
  },
  rsharePools: {
    2001: "0xa85B4e44A28B5F10b3d5751A68e03E44B53b7e89",
    250: "0xcc0a87F7e7c693042a9Cc703661F5060c80ACb43",
    137: "0xA375495919205251a05f3B259B4D3cc30a4d3ED5",
    97: "",
  },
  ravPools: {
    2001: "0x9F6fFbE7BE08784bFe2297eBEb80E0F21bF72F3F",
    250: "0xcc0a87F7e7c693042a9Cc703661F5060c80ACb43",
    137: "0xA375495919205251a05f3B259B4D3cc30a4d3ED5",
    97: "",
  },
  masonry: {
    2001: "0x618C166262282DcB6Cdc1bFAB3808e2fa4ADFEc2",
    250: "0x8764DE60236C5843D9faEB1B638fbCE962773B67",
    137: "0xc6fcd85ddd4a301c9babffefc07dadddf7b413a4",
    97: "",
  },
  treasury: {
    2001: "0x351bDAC12449974e98C9bd2FBa572EdE21C1b7C4",
    250: "0xF50c6dAAAEC271B56FCddFBC38F0b56cA45E6f0d",
    137: "0xc6fcd85ddd4a301c9babffefc07dadddf7b413a4",
    97: "",
  },
  hunter: {
    2001: "0x13a1F67fe39A600dC39CB3BE2B6B77E8DaC6D902",
    250: "0xF50c6dAAAEC271B56FCddFBC38F0b56cA45E6f0d",
    137: "0xc6fcd85ddd4a301c9babffefc07dadddf7b413a4",
    97: "",
  },
};

const CONTRACTS =
  process.env.NODE_ENV !== "production"
    ? PRODUCTION_CONTRACTS
    : PRODUCTION_CONTRACTS;

export default CONTRACTS;
