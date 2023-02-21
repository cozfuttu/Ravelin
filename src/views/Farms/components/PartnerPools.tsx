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
  const transfersTpgx1 = usePastTranferEvent(tokenAddresses.tpgx, ['0xa94f0F7E08403085e25555b3f14a2A3e6b4138d7'])
  const transfersTpgx2 = usePastTranferEvent(tokenAddresses.tpgx, ['0x8567aE9460A2f03D8C2523DAC85C41e7F479d03c'])
  const transfersTpgx3 = usePastTranferEvent(tokenAddresses.tpgx, ['0x04b11f68EfBb88c50Abed80903F19897e6f16CAc'])
  const transfersTpgx4 = usePastTranferEvent(tokenAddresses.tpgx, ['0xF4c34125372e40016aF689e0EE0e3160372E2E7A'])
  const transfersTpgx5 = usePastTranferEvent(tokenAddresses.tpgx, ['0xa9f534E267D4c9307DCc2f7Bfafd5a58b8ecb8F3'])
  const transfersRav = usePastTranferEvent(tokenAddresses.rav, ['0x8Fc6C4D3B07CAcF14C5eCD193F5513DAFBA6ff53'])
  const transfersBusd = usePastTranferEvent(tokenAddresses.busd, ['0x7f3f0f05cbb7DbB0fAd16965044BC3B5116660Af'])
  const transfers = [...transfersWada, ...transfersTpgx1, ...transfersTpgx2, ...transfersTpgx3, ...transfersTpgx4, ...transfersTpgx5, ...transfersRav, ...transfersBusd].sort((transfer1, transfer2) => transfer1.blockNumber - transfer2.blockNumber)
  console.log(transfers)

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
  const { onTransfer: onTransferTpgx1 } = useTransfer(tokenAddresses.tpgx, "0xa94f0F7E08403085e25555b3f14a2A3e6b4138d7")
  const { onTransfer: onTransferTpgx2 } = useTransfer(tokenAddresses.tpgx, "0x8567aE9460A2f03D8C2523DAC85C41e7F479d03c")
  const { onTransfer: onTransferTpgx3 } = useTransfer(tokenAddresses.tpgx, "0x04b11f68EfBb88c50Abed80903F19897e6f16CAc")
  const { onTransfer: onTransferTpgx4 } = useTransfer(tokenAddresses.tpgx, "0xF4c34125372e40016aF689e0EE0e3160372E2E7A")
  const { onTransfer: onTransferTpgx5 } = useTransfer(tokenAddresses.tpgx, "0xa9f534E267D4c9307DCc2f7Bfafd5a58b8ecb8F3")
  const { onTransfer: onTransferRav } = useTransfer(tokenAddresses.rav, "0x8Fc6C4D3B07CAcF14C5eCD193F5513DAFBA6ff53")
  /*const { onTransfer: onTransferWada } = useTransfer(tokenAddresses.wADA, "0x04bb0e8D204AC7468445b63A5bfAec16b310e7fA")
  const { onTransfer: onTransferBusd } = useTransfer(tokenAddresses.busd, "0x7f3f0f05cbb7DbB0fAd16965044BC3B5116660Af")*/

  const [onPresentModalTpgx1] = useModal(<DepositModal max={balanceTpgx} decimals={18} onConfirm={onTransferTpgx1} tokenName='TPGX' />)
  const [onPresentModalTpgx2] = useModal(<DepositModal max={balanceTpgx} decimals={18} onConfirm={onTransferTpgx2} tokenName='TPGX' />)
  const [onPresentModalTpgx3] = useModal(<DepositModal max={balanceTpgx} decimals={18} onConfirm={onTransferTpgx3} tokenName='TPGX' />)
  const [onPresentModalTpgx4] = useModal(<DepositModal max={balanceTpgx} decimals={18} onConfirm={onTransferTpgx4} tokenName='TPGX' />)
  const [onPresentModalTpgx5] = useModal(<DepositModal max={balanceTpgx} decimals={18} onConfirm={onTransferTpgx5} tokenName='TPGX' />)
  const [onPresentModalRav] = useModal(<DepositModal max={balanceRav} decimals={18} onConfirm={onTransferRav} tokenName='RAV' />)
  /*const [onPresentModalWada] = useModal(<DepositModal max={balanceWada} decimals={18} onConfirm={onTransferWada} tokenName='wADA' />)
  const [onPresentModalBusd] = useModal(<DepositModal max={balanceBusd} decimals={18} onConfirm={onTransferBusd} tokenName='BUSD' />)*/

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
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ display: 'flex', alignItems: 'center', gap: '32px', textAlign: 'center' }} >The wADA rewards from the pool below are provided by TRUST Pool.</Text>
      <Cards>
        {FarmCards.filter((card) => card.props.interstellar.partnerName === "TRUST Pool")}
      </Cards>
      <Text color='#000' fontSize='32px' bold mb="16px" mt={isMobile ? '8px' : '16px'} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Trust Pool Community Campaign</Text>
      <Text color='#000' fontSize='16px' mb="32px" style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits will be incentivized by buybacks and extended farming time:</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits to RAV / ADA pool will activate RAV buybacks.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits to RSHARE / ADA pool will activate RSHARE buybacks.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits to RAV / TPGX pool will activate RAV + TPGX  LP buyback.</Text>
      <Text color='#000' fontSize='16px' mb="32px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Community deposits to RSHARE / TPGX pool will activate RSHARE + TPGX LP buyback.</Text>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button onClick={onPresentModalRav} style={{ backgroundColor: '#d61111' }}>Deposit RAV #1</Button>
        <Button onClick={onPresentModalTpgx1} style={{ backgroundColor: '#d61111' }}>Deposit TPGX #2</Button>
        <Button onClick={onPresentModalTpgx2} style={{ backgroundColor: '#d61111' }}>Deposit TPGX #3</Button>
        <Button onClick={onPresentModalTpgx3} style={{ backgroundColor: '#d61111' }}>Deposit TPGX #4</Button>
        <br />
        <Button onClick={onPresentModalTpgx4} style={{ backgroundColor: '#d61111' }}>Deposit TPGX #5</Button>
        <Button onClick={onPresentModalTpgx5} style={{ backgroundColor: '#d61111' }}>Deposit TPGX #6</Button>
        
      </div>
      <Transfers>
        <Text color='#000' fontSize='24px' bold mb="16px" style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Deposits By Community</Text>
        {transfersFormatted}
      </Transfers>
    </Background >
  )
}

export default PartnerPools