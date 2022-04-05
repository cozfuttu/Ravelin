import React from 'react'
import { ModalProvider } from 'uikit'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { Provider } from 'react-redux'
import getRpcUrl from 'utils/getRpcUrl'
import store from 'state'
import { ThemeContextProvider } from 'contexts/ThemeContext'

const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl()
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID)
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <bsc.UseWalletProvider
          chainId={chainId}
          connectors={{
            walletconnect: { rpcUrl },
            bsc,
          }}
        >
          <BlockContextProvider>
            <RefreshContextProvider>
              <ModalProvider>{children}</ModalProvider>
            </RefreshContextProvider>
          </BlockContextProvider>
        </bsc.UseWalletProvider>
      </ThemeContextProvider>
    </Provider>
  )
}

export default Providers
