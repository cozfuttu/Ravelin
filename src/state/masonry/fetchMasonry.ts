import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masonryABI from 'config/abi/masonry.json'
import multicall from 'utils/multicall'
import { getMasonryAddress, getRshareAddress, getRshareNativeLPAddress, getWbnbAddress } from 'utils/addressHelpers'


const fetchMasonry = async () => {
  const masonryAddress = getMasonryAddress()
  const RshareAddress = getRshareAddress()
  const rshareNativeLpAddress = getRshareNativeLPAddress()
  const nativeAddress = getWbnbAddress()

  const erc20Calls = [
    // Balance of token in the rav-native LP contract
    {
      address: RshareAddress,
      name: 'balanceOf',
      params: [rshareNativeLpAddress],
    },
    // Balance of native token on rav-native LP contract.
    {
      address: nativeAddress,
      name: 'balanceOf',
      params: [rshareNativeLpAddress],
    },
    // Balance of Rshare in masonry contract
    {
      address: RshareAddress,
      name: 'balanceOf',
      params: [masonryAddress]
    },
    // Token decimals
    {
      address: RshareAddress,
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: nativeAddress,
      name: 'decimals',
    },
  ]

  const [tokenBalanceLP,
    quoteTokenBlanceLP,
    balanceOfRshareInContract,
    tokenDecimals,
    quoteTokenDecimals] = await multicall(erc20, erc20Calls)
  const rshareAmountInContract = new BigNumber(balanceOfRshareInContract).div(1e18)

  const tokenAmount = new BigNumber(balanceOfRshareInContract).div(new BigNumber(10).pow(tokenDecimals))
  const tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP)) // Native Price of token (RSHARE)
  const lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote) // Native price of token amount in contract

  const masonryCalls = [
    {
      address: masonryAddress,
      name: 'epoch'
    },
    {
      address: masonryAddress,
      name: 'nextEpochPoint'
    },
    {
      address: masonryAddress,
      name: 'getTombPrice'
    },
    {
      address: masonryAddress,
      name: 'withdrawLockupEpochs'
    },
    {
      address: masonryAddress,
      name: 'rewardLockupEpochs'
    },
  ]

  const [ epoch, nextEpochPoint, tombPrice, withdrawLockupEpochs, rewardLockupEpochs ] = await multicall(masonryABI, masonryCalls)

  return {
    tokenAmount: tokenAmount.toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
    tshareDecimals: tokenDecimals[0],
    quoteTokenDecimals: quoteTokenDecimals[0],
    totalRshareStaked: rshareAmountInContract.toNumber(),
    epoch: new BigNumber(epoch[0]._hex).toJSON(),
    nextEpochPoint: new BigNumber(nextEpochPoint[0]._hex).toJSON(),
    tombPrice: new BigNumber(tombPrice[0]._hex).div(1e18).toJSON(),
    withdrawLockupEpochs: new BigNumber(withdrawLockupEpochs[0]._hex).toJSON(),
    rewardLockupEpochs: new BigNumber(rewardLockupEpochs[0]._hex).toJSON(),
  }
}

export default fetchMasonry
