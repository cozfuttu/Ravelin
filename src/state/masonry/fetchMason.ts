import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masonryABI from 'config/abi/masonry.json'
import multicall from 'utils/multicall'
import farmsConfig from 'config/constants/farms'
import { getMasonryAddress, getRshareAddress } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchMason = async (account) => {
  const masonryAddress = getMasonryAddress()
  const rshareAddress = getRshareAddress()

  const erc20AbiCalls = [
    { address: rshareAddress, name: 'allowance', params: [account, masonryAddress] },
    { address: rshareAddress, name: 'balanceOf', params: [account] },
  ]

  const [allowanceResponse, tokenBalanceResponse] = await multicall(erc20ABI, erc20AbiCalls)

  const masonryAbiCalls = [
    { address: masonryAddress, name: 'masons', params: [account] },
    { address: masonryAddress, name: 'canWithdraw', params: [account] },
    { address: masonryAddress, name: 'canClaimReward', params: [account] },
    { address: masonryAddress, name: 'earned', params: [account] },
    { address: masonryAddress, name: 'balanceOf', params: [account] },
  ]

  const [ masonInfo, canWithdraw, canClaimReward, earned, stakedBalance ] = await multicall(masonryABI, masonryAbiCalls)

  return {
    allowance: new BigNumber(allowanceResponse).toJSON(),
    tokenBalance: new BigNumber(tokenBalanceResponse).toJSON(),
    lastSnapshotIndex: new BigNumber(masonInfo[0]._hex).toJSON(),
    rewardEarned: new BigNumber(masonInfo[1]._hex).toJSON(),
    epochTimerStart: new BigNumber(masonInfo[2]._hex).toJSON(),
    canWithdraw: canWithdraw[0],
    canClaimReward: canClaimReward[0],
    earned: new BigNumber(earned[0]._hex).toJSON(),
    stakedBalance: new BigNumber(stakedBalance[0]._hex).toJSON()
  }
}

export default fetchMason
