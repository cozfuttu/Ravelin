import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getRavAddress, getRbondAddress, getTreasuryAddress } from 'utils/addressHelpers'

const fetchTreasuryUser = async (account) => {
  const treasuryAddress = getTreasuryAddress()
  const ravAddress = getRavAddress()
  const rbondAddress = getRbondAddress()

  const erc20AbiCalls = [
    { address: ravAddress, name: 'allowance', params: [account, treasuryAddress] },
    { address: rbondAddress, name: 'allowance', params: [account, treasuryAddress] },
    { address: ravAddress, name: 'balanceOf', params: [account] },
    { address: rbondAddress, name: 'balanceOf', params: [account] },
  ]

  const [allowanceResponseRav, allowanceResponseRbond, tokenBalanceResponseRav, tokenBalanceResponseRbond] = await multicall(erc20ABI, erc20AbiCalls)

  return {
    allowanceRav: new BigNumber(allowanceResponseRav).toJSON(),
    allowanceRbond: new BigNumber(allowanceResponseRbond).toJSON(),
    tokenBalanceRav: new BigNumber(tokenBalanceResponseRav).toJSON(),
    tokenBalanceRbond: new BigNumber(tokenBalanceResponseRbond).toJSON(),
  }
}

export default fetchTreasuryUser
