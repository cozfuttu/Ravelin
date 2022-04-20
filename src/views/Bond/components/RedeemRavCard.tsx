import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import UnlockButton from 'components/UnlockButton'
import React, { useCallback, useMemo, useState } from 'react'
import { Treasury } from 'state/types'
import styled from 'styled-components'
import { Button, Text, useModal } from 'uikit'
import { getRbondAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/erc20'
import HexCardShadow from './HexCard'
import { useApproveTreasury } from 'hooks/useApprove'
import BigNumber from 'bignumber.js'
import DepositModal from 'views/components/DepositModal'
import { useRedeemBonds } from 'hooks/useRedeemBonds'

const Image = styled.img`
  max-width: 264px;
`

interface Props {
  treasury: Treasury
}

const BOND_REDEEM_PRICE = 1.01

const RedeemRavCard: React.FC<Props> = ({ treasury }) => {
  const { account, ethereum }: { account: string, ethereum: provider } = useWallet()
  /*   const nativePrice = usePriceBnbBusd()
    const ravPriceInNative = usePriceRavBusd().div(nativePrice) */

  const [requestedApproval, setRequestedApproval] = useState(false)

  const rbondAddress = getRbondAddress()

  const { userData, twap, tombPrice, reserve } = treasury

  const { onRedeem } = useRedeemBonds(tombPrice)

  const twapPrice = new BigNumber(twap).div(1e18)

  const isApproved = new BigNumber(userData?.allowanceRbond).isGreaterThan(0)
  const isEnabled = twapPrice.isGreaterThan(BOND_REDEEM_PRICE) && new BigNumber(reserve).isGreaterThan(0)

  const rbondInWallet = userData?.tokenBalanceRbond ? new BigNumber(userData?.tokenBalanceRbond) : new BigNumber(0)

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, rbondAddress)
  }, [ethereum, rbondAddress])

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

  const [onPresentRedeem] = useModal(
    <DepositModal
      max={rbondInWallet}
      decimals={18}
      onConfirm={onRedeem}
      tokenName='RBOND'
      depositFeeBP={0}
      topic='Redeem'
    />,
  )

  const renderApprovalOrRedeemButton = () => {
    return isApproved ? <Button disabled /*={!isEnabled} */ size="sm" onClick={onPresentRedeem} style={{ fontSize: !isEnabled && '12px' }}>{isEnabled ? 'REDEEM' : 'ENABLED WHEN RAV > 1.01 ADA'}</Button> : (
      <Button mt="16px" size='sm' disabled /*={requestedApproval} */ onClick={handleApprove}>
        Approve Contract
      </Button>
    )
  }

  return (
    <HexCardShadow>
      <Text color='#888888' fontSize='20px' bold>Redeem RAV</Text>
      <Image src="images/icons/redeemRav.png" />
      <Text color='#9D9D9D' fontSize='14px' style={{ textAlign: 'center' }}>{rbondInWallet.div(1e18).toFormat(2)} RBOND Available in wallet</Text>
      {!account ? <UnlockButton mt="16px" size='sm' /> : renderApprovalOrRedeemButton()}
    </HexCardShadow>
  )
}

export default RedeemRavCard