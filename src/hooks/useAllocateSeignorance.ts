import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchTreasuryUserDataAsync } from 'state/actions'
import { allocateSeigniorage } from 'utils/callHelpers'
import { useTreasuryContract } from './useContract'

const useAllocateSeigniorage = () => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const treasuryContract = useTreasuryContract()

  const handleAllocate = useCallback(async () => {
    try {
      const tx = await allocateSeigniorage(treasuryContract, account)
      dispatch(fetchTreasuryUserDataAsync(account))
      return tx
    } catch (e) {
      console.log('allocation error: ', e)
    }
  }, [account, dispatch, treasuryContract])

  return { onAllocate: handleAllocate }
}

export default useAllocateSeigniorage