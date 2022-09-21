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
  overflow-y: scroll;
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
  const transfers = usePastTranferEvent(tokenAddresses.wADA)

  const transfersFormatted = transfers.map((transfer) => {
    const { returnValues, blockNumber, blockHash } = transfer
    const depositor = formatAddress(returnValues.from)
    const amount = (parseInt(returnValues.value) / 1e18).toLocaleString('en', {
      maximumFractionDigits: 2
    })
    return (
      <Transfer key={blockHash}>
        {depositor} deposited <b style={{ color: '#158bce' }}>&nbsp;{amount} wADA&nbsp;</b> on block #{blockNumber}
      </Transfer>
    )
  })

  const balance = useTokenBalance(tokenAddresses.wADA)
  const { onTransfer } = useTransfer(tokenAddresses.wADA, "0x77aB41738d9dF3d0B42AdD75DC6243db18dcd36C")
  const { onTransfer: onTransferToLPPool } = useTransfer(tokenAddresses.wADA, "0xb4690c222D8222fd662aF209FB2298dFFf1c6B04")

  const [onPresentModal] = useModal(<DepositModal max={balance} decimals={18} onConfirm={onTransfer} tokenName='wADA' />)
  const [onPresentModal2] = useModal(<DepositModal max={balance} decimals={18} onConfirm={onTransferToLPPool} tokenName='wADA' />)

  const FarmCards = interstellarsToDisplayWithApy.map((interstellar) =>
    <InterstellarCard
      key={interstellar.contractAddress}
      interstellar={interstellar}
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
      <Text color='#000' fontSize='32px' bold mb="16px" mt={isMobile ? '8px' : '16px'} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Trust Pool Special Campaign</Text>
      <Text color='#000' fontSize='16px' mb="32px" style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Depositing wADA will provide following benefits:</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >-The time of the pool will extend and you can keep farming wADA</Text>
      <Text color='#000' fontSize='16px' mb="32px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >- For each wADA deposit Trust Pool will buyback the same amount RAV; thus, the price of RAV will increase.</Text>
      <Text color='#000' fontSize='16px' mb="32px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Every address participating for community deposits is eligible for TRUST token airdrop starting October 15th.</Text>
      <Text color='#000' fontSize='16px' mb="32px" bold style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Campaign Milestones:</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Road to 5000 wADA inside the contract = boost 20% more RAV buyback</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Road to 7500 wADA inside the contract = boost 20% more RAV buyback</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Road to 10000 wADA inside the contract = boost 20% more RAV buyback</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Road to 25000 wADA inside the contract = boost 20% more RAV buyback</Text>
      <Text color='#000' fontSize='16px' mb="32px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Road to 50000 wADA inside the contract = boost 20% more RAV buyback</Text>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', alignItems: 'center' }}>
        <Button onClick={onPresentModal2} style={{ backgroundColor: '#d61111' }}>Deposit wADA to LP Pool</Button>
        <Button onClick={onPresentModal} style={{ backgroundColor: '#d61111' }}>Deposit wADA to Single Pool</Button>
      </div>
      <Transfers>
        <Text color='#000' fontSize='24px' bold mb="16px" style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Deposits By Community</Text>
        {transfersFormatted}
      </Transfers>
    </Background >
  )
}

export default PartnerPools