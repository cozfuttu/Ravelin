import BigNumber from 'bignumber.js'

export { default as formatAddress } from './formatAddress'

export const gbnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}
