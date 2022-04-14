import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchTreasuryUserDataAsync } from 'state/actions'
import { redeemBonds } from 'utils/callHelpers'
import { useTreasuryContract} from './useContract'

export const useRedeemBonds = (targetPrice: string) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useTreasuryContract()

  const handleRedeem = useCallback(
    async (bondAmount: string) => {
      console.log('bonu: ', bondAmount)
      const txHash = await redeemBonds(masterChefContract, bondAmount, targetPrice, account)
      dispatch(fetchTreasuryUserDataAsync(account))
      return txHash
    },
    [account, dispatch, masterChefContract, targetPrice],
  )

  return { onRedeem: handleRedeem }
}