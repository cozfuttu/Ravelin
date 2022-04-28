import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import UnlockButton from 'components/UnlockButton'
import React, { useCallback, useMemo, useState } from 'react'
import { Treasury } from 'state/types'
import styled from 'styled-components'
import { Button, Text, useModal } from 'uikit'
import { getRavAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/erc20'
import HexCardShadow from './HexCard'
import { useApproveTreasury } from 'hooks/useApprove'
import DepositModal from 'views/components/DepositModal'
import { useBuyBonds } from 'hooks/useBuyBonds'

const Image = styled.img`
  max-width: 264px;
`

interface Props {
  treasury: Treasury
}

const PurchaseRBondCard: React.FC<Props> = ({ treasury }) => {
  //  console.log('treasury: ', treasury)

  const { account, ethereum }: { account: string, ethereum: provider } = useWallet()

  const [requestedApproval, setRequestedApproval] = useState(false)

  const ravAddress = getRavAddress()

  const { userData, burnableTombLeft, tombPrice } = treasury
  const isApproved = new BigNumber(userData?.allowanceRav).isGreaterThan(0)

  const { onBuy } = useBuyBonds(tombPrice)

  const rbondAvailable = new BigNumber(burnableTombLeft).div(1e18)
  const isRbondAvailable = rbondAvailable.isGreaterThan(0)

  const ravInWallet = userData?.tokenBalanceRav ? new BigNumber(userData?.tokenBalanceRav) : new BigNumber(0)

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, ravAddress)
  }, [ethereum, ravAddress])

  const { onApprove } = useApproveTreasury(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
    } catch (e) {
      console.error(e)
    }
    finally {
      setRequestedApproval(false)
    }
  }, [onApprove])

  const [onPresentPurchase] = useModal(
    <DepositModal
      max={ravInWallet}
      decimals={18}
      onConfirm={onBuy}
      tokenName='RAV'
      depositFeeBP={0}
      topic='Purchase'
    />,
  )

  const renderApprovalOrPurchaseButton = () => {
    return isApproved ? <Button disabled={!isRbondAvailable} size="sm" onClick={onPresentPurchase}>Purchase</Button> : (
      <Button mt="16px" size='sm' disabled={requestedApproval} onClick={handleApprove}>
        Approve Contract
      </Button>
    )
  }

  return (
    <HexCardShadow>
      <Text color='#888888' fontSize='20px' bold>Purchase RBOND</Text>
      <Image src="images/icons/purchaseRbond.png" />
      <Text color='#9D9D9D' fontSize='16px' style={{ textAlign: 'center' }}>{!isRbondAvailable ? 'RAV is over peg' : `${rbondAvailable.toFormat(2)} RBOND available for purchase`} </Text>
      {!account ? <UnlockButton mt="16px" size='sm' /> : renderApprovalOrPurchaseButton()}
    </HexCardShadow>
  )
}

export default PurchaseRBondCard