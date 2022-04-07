import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from 'uikit'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useWallet } from '@binance-chain/bsc-use-wallet'

interface DepositModalProps {
  max: BigNumber
  decimals: number
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  depositFeeBP?: number
  topic?: string
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  decimals,
  onConfirm,
  onDismiss,
  tokenName = '',
  depositFeeBP = 0,
  topic,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, decimals)
  }, [max, decimals])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={`${topic ?? 'Deposit'} ${tokenName}`} onDismiss={onDismiss}>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        depositFeeBP={depositFeeBP}
      />
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss}>
          Cancel
        </Button>
        <Button
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            console.log('tombAmount: ', val)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? 'Pending Confirmation' : 'Confirm'}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
