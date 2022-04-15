import BigNumber from 'bignumber.js'
import treasuryABI from 'config/abi/treasury.json'
import multicall from 'utils/multicall'
import { getTreasuryAddress } from 'utils/addressHelpers'

const fetchMasonry = async () => {
  const treasuryAddress = getTreasuryAddress()

  const treasuryCalls = [
    {
      address: treasuryAddress,
      name: 'getRAVUpdatedPrice' // TWAP
    },
    {
      address: treasuryAddress,
      name: 'epoch'
    },
    {
      address: treasuryAddress,
      name: 'nextEpochPoint'
    },
    {
      address: treasuryAddress,
      name: 'epochSupplyContractionLeft', // x RBOND available for purchase
    },
    {
      address: treasuryAddress,
      name: 'startTime',
    },
    {
      address: treasuryAddress,
      name: 'previousEpochRavPrice',
    },
    {
      address: treasuryAddress,
      name: 'discountPercent',
    },
    {
      address: treasuryAddress,
      name: 'premiumPercent',
    },
    {
      address: treasuryAddress,
      name: 'getReserve',
    },
/*     {
      address: treasuryAddress,
      name: 'getBurnableRavLeft',
    }, */
    {
      address: treasuryAddress,
      name: 'getRedeemableBonds',
    },
    {
      address: treasuryAddress,
      name: 'getBondDiscountRate',
    },
    {
      address: treasuryAddress,
      name: 'getBondPremiumRate',
    },
/*     {
      address: treasuryAddress,
      name: 'getRavCirculatingSupply',
    }, */
    {
      address: treasuryAddress,
      name: 'getRavPrice',
    },
    {
      address: treasuryAddress,
      name: 'PERIOD',
    },
  ]

  const [ TWAP,
    epoch,
    nextEpochPoint,
    epochSupplyContractionLeft,
    startTime,
    previousEpochTombPrice,
    discountPercent,
    premiumPercent,
    getReserve,
    /* getBurnableTombLeft, */
    getRedeemableBonds,
    getBondDiscountRate,
    getBondPremiumRate,
    /* getTombCirculatingSupply, */
    getTombPrice,
    PERIOD] = await multicall(treasuryABI, treasuryCalls)

  return {
    twap: new BigNumber(TWAP[0]._hex).toJSON(),
    epoch: new BigNumber(epoch[0]._hex).toJSON(),
    nextEpochPoint: new BigNumber(nextEpochPoint[0]._hex).toJSON(),
    epochSupplyContractionLeft: new BigNumber(epochSupplyContractionLeft[0]._hex).toJSON(),
    startTime: new BigNumber(startTime[0]._hex).toJSON(),
    previousEpochTombPrice: new BigNumber(previousEpochTombPrice[0]._hex).toJSON(),
    discountPercent: new BigNumber(discountPercent[0]._hex).toJSON(),
    premiumPercent: new BigNumber(premiumPercent[0]._hex).toJSON(),
    reserve: new BigNumber(getReserve[0]._hex).toJSON(),
  //  burnableTombLeft: new BigNumber(getBurnableTombLeft[0]._hex).toJSON(),
    redeemableBonds: new BigNumber(getRedeemableBonds[0]._hex).toJSON(),
    bondDiscountRate: new BigNumber(getBondDiscountRate[0]._hex).toJSON(),
    bondPremiumRate: new BigNumber(getBondPremiumRate[0]._hex).toJSON(),
  //  tombCirculatingSupply: new BigNumber(getTombCirculatingSupply[0]._hex).toJSON(),
    tombPrice: new BigNumber(getTombPrice[0]._hex).toJSON(),
    period: new BigNumber(PERIOD[0]._hex).toJSON(),
  }
}

export default fetchMasonry
