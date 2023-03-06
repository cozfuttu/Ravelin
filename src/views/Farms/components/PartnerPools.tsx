import { tokenAddresses } from 'config/constants/addresses'
import usePastTranferEvent from 'hooks/usePastTransferEvent'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTransfer } from 'hooks/useTransfer'
import React from 'react'
import styled from 'styled-components'
import { Button, Link, Text, useModal } from 'uikit'
import formatAddress from 'utils/formatAddress'
import DepositModal from 'views/components/DepositModal'
import InterstellarCard, { InterstellarWithStakedValue } from './InterstellarCard'

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 0;
  background-color: #E6E6E6;
  border-radius: 8px;
  min-height: 250px;
  min-width: 250px;
  position: relative;

  @media (max-width: 1080px) {
    padding: 1rem;
    margin: 0;
  }
`

const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
`

const Transfers = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  max-height: 200px;
  width: 80%;
  padding: 24px;
  text-align: center;
  margin-top: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 8px;
`

const Transfer = styled.div`
  display: flex;
  font-family: 'Inter', sans-serif;
  text-align: center;
  justify-content: center;
`

interface CardsProps {
  interstellarsToDisplayWithApy: InterstellarWithStakedValue[]
  isMobile: boolean
}

const PartnerPools: React.FC<CardsProps> = ({ interstellarsToDisplayWithApy, isMobile }) => {
  const transfersWada = usePastTranferEvent(tokenAddresses.wADA, ['0x04bb0e8D204AC7468445b63A5bfAec16b310e7fA'])
  const transfersTpgx = usePastTranferEvent(tokenAddresses.tpgx, ['0x37e2a5F3f3585F3db70e0fC7d84015C8dca9D18b'])
  const transfersRav = usePastTranferEvent(tokenAddresses.rav, ['0x8Fc6C4D3B07CAcF14C5eCD193F5513DAFBA6ff53'])
  const transfersBusd = usePastTranferEvent(tokenAddresses.busd, ['0x7f3f0f05cbb7DbB0fAd16965044BC3B5116660Af'])
  const transfersOcx = usePastTranferEvent(tokenAddresses.ocx, ['0x12e304e952EcE70410c1175166DD620809605B96'])

  const transfers = [...transfersWada, ...transfersTpgx, ...transfersRav, ...transfersBusd, ...transfersOcx].sort((transfer1, transfer2) => transfer1.blockNumber - transfer2.blockNumber)

  const transfersFormatted = transfers.map((transfer) => {
    const { returnValues, blockNumber, blockHash, address } = transfer
    const depositor = formatAddress(returnValues.from)
    const amount = (parseInt(returnValues.value) / 1e18).toLocaleString('en', {
      maximumFractionDigits: 2
    })
    const tokenName = Object.keys(tokenAddresses).find((tokenSymbol) => tokenAddresses[tokenSymbol] === address).toUpperCase()
    return (
      <Transfer key={blockHash}>
        {depositor} deposited <b style={{ color: '#158bce' }}>&nbsp;{amount} {tokenName}&nbsp;</b> on block #{blockNumber}
      </Transfer>
    )
  })

  const balanceTpgx = useTokenBalance(tokenAddresses.tpgx)
  const balanceRav = useTokenBalance(tokenAddresses.rav)
  const balanceWada = useTokenBalance(tokenAddresses.wADA)
  const balanceBusd = useTokenBalance(tokenAddresses.busd)
  const balanceOcx = useTokenBalance(tokenAddresses.ocx)

  const { onTransfer: onTransferTpgx } = useTransfer(tokenAddresses.tpgx, "0x37e2a5F3f3585F3db70e0fC7d84015C8dca9D18b")
  const { onTransfer: onTransferRav } = useTransfer(tokenAddresses.rav, "0x8Fc6C4D3B07CAcF14C5eCD193F5513DAFBA6ff53")
  const { onTransfer: onTransferWada } = useTransfer(tokenAddresses.wADA, "0x04bb0e8D204AC7468445b63A5bfAec16b310e7fA")
  const { onTransfer: onTransferBusd } = useTransfer(tokenAddresses.busd, "0x7f3f0f05cbb7DbB0fAd16965044BC3B5116660Af")
  const { onTransfer: onTransferOcx } = useTransfer(tokenAddresses.ocx, "0x12e304e952EcE70410c1175166DD620809605B96")

  const [onPresentModalTpgx] = useModal(<DepositModal max={balanceTpgx} decimals={18} onConfirm={onTransferTpgx} tokenName='TPGX' />)
  const [onPresentModalRav] = useModal(<DepositModal max={balanceRav} decimals={18} onConfirm={onTransferRav} tokenName='RAV' />)
  const [onPresentModalWada] = useModal(<DepositModal max={balanceWada} decimals={18} onConfirm={onTransferWada} tokenName='wADA' />)
  const [onPresentModalBusd] = useModal(<DepositModal max={balanceBusd} decimals={18} onConfirm={onTransferBusd} tokenName='BUSD' />)
  const [onPresentModalOcx] = useModal(<DepositModal max={balanceOcx} decimals={18} onConfirm={onTransferOcx} tokenName='OCX' />)

  const FarmCards = interstellarsToDisplayWithApy.map((interstellar, index) =>
    <InterstellarCard
      key={interstellar.contractAddress}
      interstellar={interstellar}
      index={index}
      isMobile={isMobile}
    />
  )

  return (
    <Background>
      <Link href="https://adapools.org/pool/b42ea10739065e30e388d4781a7f5a446c3a31343c87dcf26750f83d" style={{ fontSize: '48px', color: "#000", marginBottom: '24px' }}><img src="images/icons/trustpool.webp" width={125} alt="TRUST Pool" />TRUST POOL </Link>
      <Text color='#000' fontSize='16px' mb="32px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Powered by Cardano, TRUST is the official pool of TRUST fi. Our future mission is to bring value by providing more liquidity to the Cardano and Milkomeda blockchain.</Text>
      <Text color='#000' fontSize='16px' mb="32px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Starting from epoch 350, ADA delegators will receive RAV airdrops.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ display: 'flex', alignItems: 'center', gap: '32px', textAlign: 'center' }} >The wADA rewards from the pool below are provided by TRUST Pool.</Text>
      <Cards>
        {FarmCards.filter((card) => card.props.interstellar.partnerName === "TRUST Pool")}
      </Cards>
      <Text color='#000' fontSize='32px' bold mb="16px" mt={isMobile ? '8px' : '16px'} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Trust Pool Community Campaign</Text>
      <Text color='#000' fontSize='16px' mb="32px" style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits will provide the following benefits:</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >- The time of the pool will extend with each deposit and you can  continue farming.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >- Every address participating is whitelisted and eligible for airdrops, which are distributed  once per week.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >- Additional rewards are available for achieving milestones.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits to ADA / TPGX  pool will activate RAV buybacks 1:1 ratio.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits to RAV /TPGX pool will activate TPGX airdrop to participants 1:1 ratio. </Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits to TPGX pool will activate RAV buybacks + RSHARE  airdrop to participants 1:1 ratio.</Text>
      <Text color='#000' fontSize='16px' mb="32px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits to OCX pool will activate RAV+RSHARE buybacks. In addition, all participants with a minimum of 5000 OCX in community deposits will enter a 500 TPGX raffle lottery prize.</Text>
      <Text color='#000' fontSize='16px' mb="32px" bold style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Campaign Milestones:</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >10.000 TPGX in community deposits = 10% more TPGX rewards on us.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >20.000 RAV in community deposits = 10% more TPGX rewards on us + 10% more RAV buybacks.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >30.000 ADA in community deposits = 20% more TPGX rewards on us + 20% more RAV buybacks.</Text>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '90%' }}>
        <Button onClick={onPresentModalTpgx} style={{ backgroundColor: '#d61111' }}>Deposit TPGX #1</Button>
        <Button onClick={onPresentModalRav} style={{ backgroundColor: '#d61111' }}>Deposit RAV #2</Button>
        <Button onClick={onPresentModalWada} style={{ backgroundColor: '#d61111' }}>Deposit wADA #3</Button>
        <Button onClick={onPresentModalBusd} style={{ backgroundColor: '#d61111' }}>Deposit BUSD #4</Button>
        <Button onClick={onPresentModalOcx} style={{ backgroundColor: '#d61111' }}>Deposit OCX #5</Button>
      </div>
      <Transfers>
        <Text color='#000' fontSize='24px' bold mb="16px" style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Deposits By Community</Text>
        {transfersFormatted}
      </Transfers>
    </Background >
  )
}

export default PartnerPools