import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import genesisABI from 'config/abi/genesisPools.json'
import rsharePoolsABI from 'config/abi/rsharePools.json'
import ravPoolsABI from 'config/abi/ravPools.json'
import multicall from 'utils/multicall'
import farmsConfig from 'config/constants/farms'
import { getGenesisPoolsAddress, getRavPoolsAddress, getRsharePoolsAddress } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchFarmUserData = async (account) => {
  const genesisAddress = getGenesisPoolsAddress()
  const tsharePoolsAddress = getRsharePoolsAddress()
  const ravPoolsAddress = getRavPoolsAddress()

  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpContractAddress = farmConfig.isTokenOnly
        ? farmConfig.tokenAddresses[CHAIN_ID]
        : farmConfig.lpAddresses[CHAIN_ID]

      const erc20AbiCalls = [
        { address: lpContractAddress, name: 'allowance', params: [account, farmConfig.isGenesis ? genesisAddress : farmConfig.isRavPool ? ravPoolsAddress : tsharePoolsAddress] },
        { address: lpContractAddress, name: 'balanceOf', params: [account] },
      ]

      const [allowanceResponse, tokenBalanceResponse] = await multicall(erc20ABI, erc20AbiCalls)

      const masterchefAbiCalls = [
        { address: farmConfig.isGenesis ? genesisAddress : farmConfig.isRavPool ? ravPoolsAddress : tsharePoolsAddress, name: 'userInfo', params: [farmConfig.pid, account] },
        { address: farmConfig.isGenesis ? genesisAddress : farmConfig.isRavPool ? ravPoolsAddress : tsharePoolsAddress, name: farmConfig.isGenesis || farmConfig.isRavPool ? 'pendingRAV' : 'pendingShare', params: [farmConfig.pid, account] },
      ]

      const [userInfoResponse, pendingEarningsResponse] = await multicall(farmConfig.isGenesis ? genesisABI : farmConfig.isRavPool ? ravPoolsABI : rsharePoolsABI, masterchefAbiCalls)

      return {
        allowance: new BigNumber(allowanceResponse).toJSON(),
        tokenBalance: new BigNumber(tokenBalanceResponse).toJSON(),
        stakedBalance: new BigNumber(userInfoResponse[0]._hex).toJSON(),
        earnings: new BigNumber(pendingEarningsResponse).toJSON(),
      }
    }),
  )
  return data
}

export default fetchFarmUserData
