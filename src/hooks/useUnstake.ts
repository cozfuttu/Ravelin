import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, fetchMasonDataAsync } from 'state/actions'
import { unstake, unstakeMasonry } from 'utils/callHelpers'
import { useGenesisPoolsContract, useMasonryContract, useRsharePoolsContract } from './useContract'

export const useUnstakeGenesisPools = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useGenesisPoolsContract()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useUnstakeRsharePools = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useRsharePoolsContract()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useUnstakeMasonry = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasonryContract()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstakeMasonry(masterChefContract, amount, account)
      dispatch(fetchMasonDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract],
  )

  return { onUnstake: handleUnstake }
}