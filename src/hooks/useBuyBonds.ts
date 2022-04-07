import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchTreasuryUserDataAsync } from 'state/actions'
import { buyBonds } from 'utils/callHelpers'
import { useTreasuryContract} from './useContract'

export const useBuyBonds = (targetPrice: string) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useTreasuryContract()

  const handleBuy = useCallback(
    async (tombAmount: string) => {
      const txHash = await buyBonds(masterChefContract, tombAmount, targetPrice, account)
      dispatch(fetchTreasuryUserDataAsync(account))
      return txHash
    },
    [account, dispatch, masterChefContract, targetPrice],
  )

  return { onBuy: handleBuy }
}