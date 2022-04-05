import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'

import { fetchFarmUserDataAsync, fetchMasonDataAsync } from 'state/actions'
import { claimReward, harvest } from 'utils/callHelpers'
import { useGenesisPoolsContract, useRsharePoolsContract, useMasonryContract } from './useContract'

export const useHarvestGenesisPools = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useGenesisPoolsContract()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useHarvestRsharePools = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useRsharePoolsContract()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

/* export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
} */

export const useHarvestMasonry = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masonryContract = useMasonryContract()

  const handleHarvest = useCallback(async () => {
    const txHash = await claimReward(masonryContract, account)
    dispatch(fetchMasonDataAsync(account))
    return txHash
  }, [account, dispatch, masonryContract])

  return { onReward: handleHarvest }
}