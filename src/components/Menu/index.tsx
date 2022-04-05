import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
// import { allLanguages } from 'config/localisation/languageCodes'
// import { LanguageContext } from 'contexts/Localisation/languageContext'
// import useTheme from 'hooks/useTheme'
// import { usePriceCakeBusd, usePriceGbntBusd } from 'state/hooks'
import UikitMenu from 'uikit/widgets/Menu/Menu'
import config from './config'

const Menu = (props) => {
  /*  const { account, connect, reset } = useWallet()
    const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
    const { isDark, toggleTheme } = useTheme()
    const cakePriceUsd = usePriceCakeBusd()
    const GbntPriceUsd = usePriceGbntBusd() 
  
    return (
      <UikitMenu
        account={account}
        login={connect}
        logout={reset}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={selectedLanguage && selectedLanguage.code}
        langs={allLanguages}
        setLang={setSelectedLanguage}
        cakePriceUsd={cakePriceUsd.toNumber()}
        GbntPriceUsd={GbntPriceUsd.toNumber()}
        links={config}
        priceLink={`https://polygonscan.com/address/${getCakeAddress()}`}
        {...props}
      />
    ) */
  return null
}

export default Menu
