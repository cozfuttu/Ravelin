import { useWallet } from '@binance-chain/bsc-use-wallet'
import React from 'react'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import { localStorageKey } from './config'
import { Login, Config } from './types'

interface Props {
  walletConfig: Config
  login: Login
  onDismiss: () => void
  mb: string
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {
  const { account } = useWallet()
  const { title, icon: Icon } = walletConfig
  return (
    <Button
      fullWidth
      variant="tertiary"
      onClick={() => {
        login(walletConfig.connectorId)
        if (!account) {
          window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xFA' }], // chainId must be in hexadecimal numbers
          })
        }
        window.localStorage.setItem(localStorageKey, '1')
        onDismiss()
      }}
      style={{ justifyContent: 'space-between' }}
      mb={mb}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Text bold color="primary" mr="16px">
        {title}
      </Text>
      <Icon width="32px" />
    </Button>
  )
}

export default WalletCard
