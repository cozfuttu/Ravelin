import React, { useEffect } from 'react'
import WidePage from 'components/layout/WidePage'
import styled from 'styled-components'
import { Button, Text, useMatchBreakpoints } from 'uikit'
import LPCards from './components/LPCards'
import { useFarms, useInterstellars, usePriceBnbBusd, usePriceRavBusd, usePriceRshareBusd, useTreasury } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { FarmWithStakedValue } from './components/LPCard'
import { fetchFarmUserDataAsync } from 'state/farms'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import Genesis from './components/Genesis'
import BlueBack from 'views/Home/components/BlueBack'
import BlackBack from 'views/Home/components/BlackBack'
import { Footer } from 'components/Footer'
import FarmsBRGraphic from 'views/components/FarmsBRGraphic'
import { getDevAddresses } from 'utils/addressHelpers'
import { useClaimRewardDev } from 'hooks/useHarvest'
import InterstellarCards from './components/InterstellarCards'
import { InterstellarWithStakedValue } from './components/InterstellarCard'

const ImageContainer = styled.div`
  position: fixed;
  left: -10%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: -99;
`

const SECONDS_PER_YEAR = new BigNumber(31557600)

const Farms = () => {
  const farmsLP = useFarms()
  const interstellars = useInterstellars()
  const { unclaimedDevFund, unclaimedTreasuryFund } = useTreasury()
  const { isXl } = useMatchBreakpoints()

  const isMobile = isXl === false

  const rsharePrice = usePriceRshareBusd()
  const ravPrice = usePriceRavBusd()
  const nativePrice = usePriceBnbBusd()

  const { account, ethereum }: { account: string; ethereum: any } = useWallet()
  const devAddress = getDevAddresses()
  const dispatch = useDispatch()
  const { onReward } = useClaimRewardDev()

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch])

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
  const activeInterstellars = interstellars?.filter((interstellar) => interstellar.endBlock >= (Date.now() / 1000))
  //  const inactiveInterstellars = interstellars?.filter((interstellar) => interstellar.endBlock < (Date.now() / 1000))

  const farmsToDisplayWithAPY: FarmWithStakedValue[] = activeFarms.map((farm) => {

    const cakeRewardPerBlock = new BigNumber(farm.gammaPulsarPerBlock || 1)
      .times(new BigNumber(farm.poolWeight))
      .div(new BigNumber(10).pow(18))
    const cakeRewardPerYear = cakeRewardPerBlock.times(SECONDS_PER_YEAR)

    let apy;
    if (farm.isGenesis || farm.isRavPool) apy = ravPrice.times(cakeRewardPerYear)
    else apy = rsharePrice.times(cakeRewardPerYear)

    let totalValue = farm.lpTotalInQuoteToken ? new BigNumber(farm.lpTotalInQuoteToken || 0) : new BigNumber(0)

    if (farm.quoteTokenSymbol === QuoteToken.ADA) {
      totalValue = totalValue.times(nativePrice)
    } else if (farm.quoteTokenSymbol === QuoteToken.RAV) {
      totalValue = totalValue.times(ravPrice)
    } else if (farm.quoteTokenSymbol === QuoteToken.RSHARE) {
      totalValue = totalValue.times(rsharePrice)
    }

    if (totalValue.comparedTo(0) > 0) {
      apy = apy.div(totalValue)
    }

    return { ...farm, apy }
  })

  const interstellarsToDisplayWithAPY: InterstellarWithStakedValue[] = activeInterstellars?.map((interstellar) => {
    // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
    //   return farm
    // }

    const rewardPerSecond = new BigNumber(interstellar.rewardTokenPerBlock || 1)
      .div(new BigNumber(10).pow(interstellar.rewardTokenDecimals))
    const rewardPerYear = rewardPerSecond.times(SECONDS_PER_YEAR)

    let apy = new BigNumber(interstellar.rewardTokenPrice).times(rewardPerYear)

    const totalValue = new BigNumber(interstellar.stakedTokenAmount || 0).times(interstellar.stakeTokenPrice)

    if (totalValue.comparedTo(0) > 0) {
      apy = apy.div(totalValue)
    }

    return { ...interstellar, apy }
  })

  const rshareFarms = farmsToDisplayWithAPY.filter((farm) => !(farm.isGenesis) && !(farm.isRavPool))
  const ravFarms = farmsToDisplayWithAPY.filter((farm) => farm.isGenesis || farm.isRavPool)

  const unclaimedDevFundFormatted = new BigNumber(unclaimedDevFund).div(1e18).toFormat(4)
  const unclaimedTreasuryFundFormatted = new BigNumber(unclaimedTreasuryFund).div(1e18).toFormat(4)

  return (
    <>
      <WidePage style={{ maxWidth: '1000px' }}>
        {!isMobile && (<ImageContainer>
          <BlueBack />
          <BlackBack />
        </ImageContainer>)}
        <Text color='#003E78' fontSize='32px' bold style={{ marginTop: isMobile && '8vh' }}>FARM</Text>
        {
          devAddress.includes(account) &&
          <>
            <Text color='#4E4E4E' fontSize='28px' bold mt='32px'>Unclaimed Dev Fund: {unclaimedDevFundFormatted} RSHARE</Text>
            <Text color='#4E4E4E' fontSize='28px' bold>Unclaimed Community Fund: {unclaimedTreasuryFundFormatted} RSHARE</Text>
            <Button size="md" onClick={onReward}>HARVEST</Button>
          </>
        }
        <Text color='#4E4E4E' fontSize='28px' bold mt='32px'>Earn RSHARE by staking LP</Text>
        <LPCards farmsToDisplayWithApy={rshareFarms} rsharePrice={rsharePrice} nativePrice={nativePrice} account={account} ethereum={ethereum} isMobile={isMobile} />
        <Text color='#4E4E4E' fontSize='28px' bold mt='32px'>Earn tokens by staking RAV</Text>
        <InterstellarCards interstellarsToDisplayWithApy={interstellarsToDisplayWithAPY} rsharePrice={rsharePrice} nativePrice={nativePrice} account={account} ethereum={ethereum} isMobile={isMobile} />
        <Text color='#4E4E4E' fontSize='28px' bold mt='32px'>Earn RAV by Staking in Genesis Pools</Text>
        <Genesis farmsToDisplayWithApy={ravFarms} rsharePrice={rsharePrice} nativePrice={nativePrice} account={account} ethereum={ethereum} isMobile={isMobile} />
      </WidePage>
      {!isMobile && <FarmsBRGraphic />}
      {!isMobile && <Footer />}
    </>
  )
}

export default Farms