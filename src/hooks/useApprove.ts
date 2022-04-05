import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  fetchMasonDataAsync,
} from 'state/actions'
import { approve, } from 'utils/callHelpers'
import {
  useGenesisPoolsContract,
  useRsharePoolsContract,
  useMasonryContract,
} from './useContract'

// Approve a Farm
export const useApproveGenesisPools = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const masterChefContract = useGenesisPoolsContract()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export const useApproveRsharePools = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const masterChefContract = useRsharePoolsContract()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export const useApproveMasonry = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const masterChefContract = useMasonryContract()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchMasonDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}