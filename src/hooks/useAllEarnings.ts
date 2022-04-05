import { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import multicall from 'utils/multicall'
import { getGenesisPoolsAddress, getRshareAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'
import useRefresh from './useRefresh'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account }: { account: string } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {
      const calls = farmsConfig.map((farm) => { 
        if (farm.isGenesis) return ({
          address: getGenesisPoolsAddress(),
          name: 'pendingTOMB',
          params: [farm.pid, account],
          })
        return ({
          address: getRshareAddress(),
          name: 'pendingShare',
          params: [farm.pid, account],
      })})

      const res = await multicall(masterChefABI, calls)

      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useAllEarnings
