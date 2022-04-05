import { getRavAddress, getRavNativeLPAddress, getRbondAddress, getRbondRavLPAddress, getRshareAddress, getRshareNativeLPAddress, getWbnbAddress } from 'utils/addressHelpers'
import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'RAV-ADA LP',
    lpAddresses: {
      97: '',
      137: getRavNativeLPAddress(),
      250: getRavNativeLPAddress(),
    },
    tokenSymbol: 'RAV',
    tokenAddresses: {
      97: '',
      137: getRavAddress(),
      250: getRavAddress(),
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'RSHARE-ADA LP',
    lpAddresses: {
      97: '',
      137: getRshareNativeLPAddress(),
      250: getRshareNativeLPAddress()
    },
    tokenSymbol: 'RSHARE',
    tokenAddresses: {
      97: '',
      137: getRshareAddress(),
      250: getRshareAddress(),
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'WFTM',
    isTokenOnly: true,
    isGenesis: true,
    lpAddresses: {
      97: '',
      137: "", // WMATIC-USDC LP
      250: "0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c", // WFTM-USDC LP
    },
    tokenSymbol: 'WFTM',
    tokenAddresses: {
      97: getWbnbAddress(),
      137: getWbnbAddress(),
      250: getWbnbAddress(),
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 3,
    isTokenOnly: true,
    isGenesis: true,
    lpSymbol: 'BOO',
    lpAddresses: {
      97: '',
      137: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827', // MATIC - USDC
      250: '0xEc7178F4C41f346b2721907F5cF7628E388A7a58', // BOO - WFTM
    },
    tokenSymbol: 'BOO',
    tokenAddresses: {
      97: '',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      250: '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', // BOO
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    isTokenOnly: true,
    isGenesis: true,
    risk: 3,
    lpSymbol: 'SHIBA',
    lpAddresses: {
      97: '',
      137: '0x2cf7252e74036d1da831d11089d326296e64a728', // USDT - USDC
      250: '0x5B5dbe843c9909EcAD4D72554129194Df475d5d0', // SHIBA - WFTM
    },
    tokenSymbol: 'SHIBA',
    tokenAddresses: {
      97: '',
      137: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT
      250: '0x9Ba3e4F84a34DF4e08C112e1a0FF148b81655615', // SHIBA
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    risk: 3,
    isTokenOnly: true,
    isGenesis: true,
    lpSymbol: 'ZOO',
    lpAddresses: {
      97: '',
      137: '0x7b3e67e63906d8576466c2f48158a30be0a9e36c', // USDC - USDC
      250: '0x128dF293532203eFaf6e2801656844F8738dB001', // ZOO - WFTM
    },
    tokenSymbol: 'ZOO',
    tokenAddresses: {
      97: '',
      137: '0x8A953CfE442c5E8855cc6c61b1293FA648BAE472',
      250: '0x09e145A1D53c0045F41aEEf25D8ff982ae74dD56', // ZOO
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export const publicFarmsConfig: FarmConfig[] = [
  ...farms,
  {
    pid: 99,
    risk: 5,
    lpSymbol: 'RAV-ADA LP',
    lpAddresses: {
      97: '',
      137: getRavNativeLPAddress(),
      250: getRavNativeLPAddress(),
    },
    tokenSymbol: 'RAV',
    tokenAddresses: {
      97: '',
      137: getRavAddress(),
      250: getRavAddress(),
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wbnb,
    isHidden: true,
  },
  {
    pid: 100,
    risk: 5,
    lpSymbol: 'RSHARE-MATIC LP',
    lpAddresses: {
      97: '',
      137: getRshareNativeLPAddress(),
      250: getRshareNativeLPAddress(),
    },
    tokenSymbol: 'RSHARE',
    tokenAddresses: {
      97: '',
      137: getRshareAddress(),
      250: getRshareAddress(),
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wbnb,
    isHidden: true,
  },
  {
    pid: 101,
    risk: 5,
    lpSymbol: 'RBOND-RAV LP',
    lpAddresses: {
      97: '',
      137: getRbondRavLPAddress(),
      250: getRbondRavLPAddress(),
    },
    tokenSymbol: 'RBOND',
    tokenAddresses: {
      97: '',
      137: getRbondAddress(),
      250: getRbondAddress(),
    },
    quoteTokenSymbol: QuoteToken.RAV,
    quoteTokenAdresses: contracts.rav,
    isHidden: true,
  },
  {
    pid: 102,
    risk: 5,
    lpSymbol: 'WFTM-USDC LP',
    lpAddresses: {
      97: '',
      137: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827', // MATIC - USDC
      250: '0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', // WFTM - USDC
    },
    tokenSymbol: 'WFTM',
    tokenAddresses: {
      97: '',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      250: getWbnbAddress(),
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
    isHidden: true,
  },
]

export default farms
