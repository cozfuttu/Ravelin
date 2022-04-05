import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, fetchMasonDataAsync } from 'state/actions'
import { stake, stakeMasonry } from 'utils/callHelpers'
import { useGenesisPoolsContract, useMasonryContract, useRsharePoolsContract } from './useContract'

export const useStakeGenesisPools = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useGenesisPoolsContract()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      return txHash
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useStakeRsharePools = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useRsharePoolsContract()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      return txHash
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useStakeMasonry = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masonryContract = useMasonryContract()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeMasonry(masonryContract, amount, account)
      dispatch(fetchMasonDataAsync(account))
      return txHash
    },
    [account, dispatch, masonryContract],
  )

  return { onStake: handleStake }
}