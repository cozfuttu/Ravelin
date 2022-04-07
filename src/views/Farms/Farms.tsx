import React, { useEffect } from 'react'
import WidePage from 'components/layout/WidePage'
import styled from 'styled-components'
import { Text } from 'uikit'
import LPCards from './components/LPCards'
import { useFarms, usePriceBnbBusd, usePriceRavBusd, usePriceRshareBusd } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { FarmWithStakedValue } from './components/LPCard'
import { fetchFarmUserDataAsync } from 'state/farms'
import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR } from 'config'
import { QuoteToken } from 'config/constants/types'
import Genesis from './components/Genesis'
import GrayBack from 'views/Home/components/GrayBack'
import BlueBack from 'views/Home/components/BlueBack'
import BlackBack from 'views/Home/components/BlackBack'
import { useStakeRsharePools } from 'hooks/useStake'

const ImageContainer = styled.div`
  position: fixed;
  left: -10%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`

const Farms = () => {
  const farmsLP = useFarms()

  const rsharePrice = usePriceRshareBusd()
  const ravPrice = usePriceRavBusd()
  const nativePrice = usePriceBnbBusd()

  const { account, ethereum }: { account: string; ethereum: any } = useWallet()
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch])

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')

  const farmsToDisplayWithAPY: FarmWithStakedValue[] = activeFarms.map((farm) => {
    // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
    //   return farm
    // }

    const cakeRewardPerBlock = new BigNumber(farm.gammaPulsarPerBlock || 1)
      .times(new BigNumber(farm.poolWeight))
      .div(new BigNumber(10).pow(18))
    const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

    let apy;
    if (farm.isGenesis) apy = ravPrice.times(cakeRewardPerYear)
    else apy = rsharePrice.times(cakeRewardPerYear)

    let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)

    if (farm.quoteTokenSymbol === QuoteToken.WFTM || farm.quoteTokenSymbol === QuoteToken.ADA) {
      totalValue = totalValue.times(nativePrice)
    } else if (farm.quoteTokenSymbol === QuoteToken.RAV) {
      totalValue = totalValue.times(ravPrice)
    }

    if (totalValue.comparedTo(0) > 0) {
      apy = apy.div(totalValue)
    }

    return { ...farm, apy }
  })

  const rshareFarms = farmsToDisplayWithAPY.filter((farm) => !(farm.isGenesis))
  const ravFarms = farmsToDisplayWithAPY.filter((farm) => farm.isGenesis)

  return (
    <WidePage>
      <ImageContainer>
        <BlueBack />
        <BlackBack />
      </ImageContainer>
      <Text color='#003E78' fontSize='32px' bold>FARM</Text>
      <Text color='#4E4E4E' fontSize='28px' bold mt='32px'>Earn RSHARE by staking LP</Text>
      <LPCards farmsToDisplayWithApy={rshareFarms} rsharePrice={rsharePrice} nativePrice={nativePrice} account={account} ethereum={ethereum} />
      <Text color='#4E4E4E' fontSize='28px' bold mt='32px'>Earn RAV by Staking in Genesis Pools</Text>
      <Genesis farmsToDisplayWithApy={ravFarms} rsharePrice={rsharePrice} nativePrice={nativePrice} account={account} ethereum={ethereum} />
    </WidePage>
  )
}

export default Farms