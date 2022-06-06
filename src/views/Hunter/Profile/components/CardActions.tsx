/* eslint no-nested-ternary: "off" */
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, useModal } from 'uikit'
import UnlockButton from 'components/UnlockButton'
import { useHunter } from 'state/hooks'
import { useApproveHunter } from 'hooks/useApprove'
import { getBalanceNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { getRavAddress } from 'utils/addressHelpers'
import BuyModal from './BuyModal'
import BigNumber from 'bignumber.js'

const Action = styled.div`
  padding-top: 16px;
`

interface NftCardActionsProps {
  account?: string
}

const CardActions: React.FC<NftCardActionsProps> = ({ account }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { userData, hunterPrice } = useHunter()
  const { onApprove } = useApproveHunter()

  const { allowanceHunter } = userData
  const isApproved = new BigNumber(allowanceHunter).isGreaterThan(0)

  const cakeBalance = getBalanceNumber(useTokenBalance(getRavAddress()))
  const canUserAffordHunter = cakeBalance >= hunterPrice

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const [onPresentBuyModal] = useModal(<BuyModal />)

  const renderApprovalOrBuyButton = () => {
    return isApproved ? (
      <Button fullWidth disabled={!canUserAffordHunter} onClick={onPresentBuyModal}>
        {canUserAffordHunter ? "Buy Hunter" : `You need ${hunterPrice} RAV to buy a hunter.`}
      </Button>
    ) : (
      <Button mt="8px" fullWidth disabled={requestedApproval} onClick={handleApprove}>
        Approve Contract
      </Button>
    )
  }

  return <Action>{!account ? <UnlockButton mt="8px" fullWidth /> : renderApprovalOrBuyButton()}</Action>
}

export default CardActions
