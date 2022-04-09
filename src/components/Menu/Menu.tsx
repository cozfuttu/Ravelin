import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import config from './config'
import UserBlock from 'uikit/widgets/Menu/UserBlock'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Text } from 'uikit'

const Menubar = styled.nav`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center ;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 99;
  background: linear-gradient(90deg, rgba(0, 62, 120, 1) 0%, rgba(0, 122, 190, 1) 100%);
  padding: 16px;
`

const MenuItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`

const Image = styled.img`
  width: 64px;
`

const MenuLabels = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 32px;
`

const Menu = () => {
  const { account, connect, reset } = useWallet()

  return (
    <Menubar>
      <MenuItems>
        <LogoContainer>
          <Image src="images/logos/RavelinLogo.svg" />
          <Text color='#E6E6E6' fontSize='24px' style={{ letterSpacing: '4px' }}>RAVELIN FINANCE</Text>
        </LogoContainer>
        <MenuLabels>
          {config.map((menuItem) => {
            return (
              <Link to={menuItem.href} key={menuItem.label} style={{ textDecoration: 'none' }}>
                <Text fontSize='18px' bold>{menuItem.label}</Text>
              </Link>
            )
          })}
          <UserBlock account={account} login={connect} logout={reset} />
        </MenuLabels>
      </MenuItems>
    </Menubar>
  )
}

export default Menu