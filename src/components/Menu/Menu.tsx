import React, { useState } from 'react'
import styled from 'styled-components'
import config, { socials } from './config'
import UserBlock from 'uikit/widgets/Menu/UserBlock'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { SvgProps, Text, useMatchBreakpoints, Link } from 'uikit'
import * as IconModule from 'uikit/widgets/Menu/icons'
import MenuButton from 'uikit/widgets/Menu/MenuButton'
import { HamburgerIcon } from 'uikit/widgets/Menu/icons'
import MenuMobile from './MenuMobile'
import Accordion from 'uikit/widgets/Menu/Accordion'
import { MenuEntry } from './MenuEntry'
import MenuLink from 'uikit/widgets/Menu/MenuLink'

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> }

const Menubar = styled.nav`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 99;
  background: linear-gradient(90deg, rgba(0, 62, 120, 1) 0%, rgba(0, 122, 190, 1) 100%);
  padding: 16px;
  z-index: 9;

  @media (max-width: 1080px) {
    justify-content: space-between;
  }
`

const MenuItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`

const Image = styled.img`
  width: 48px;
`

const MenuLabels = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const UserBlockContainer = styled.div`
  position: absolute;
  right: 6vw;
  top: 12vh;
`

const Socials = styled.div`
  margin-left: 32px;
  display: flex;
  gap: 24px;
`

const Menu = () => {
  const { account, connect, reset } = useWallet()
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false

  const [isMobileMenuActive, setMobileMenuActive] = useState(false)

  const handleMenuClick = () => {
    setMobileMenuActive((prevState) => !prevState)
  }

  return (
    <Menubar>
      <MenuItems>
        <a href="/" style={{ textDecoration: 'none' }}>
          <LogoContainer>
            <Image src="images/logos/RavelinLogo.svg" style={{ marginLeft: isMobile && '16px' }} />
            <Text color='#E6E6E6' fontSize='20px' style={{ letterSpacing: '4px', fontSize: isMobile && '14px' }}>RAVELIN FINANCE</Text>
          </LogoContainer>
        </a>
        {!isMobile ? <MenuLabels>
          {config.map((menuItem) => {
            if (menuItem.items) {
              const calloutClass = menuItem.calloutClass ?? undefined
              return (
                <Accordion
                  key={menuItem.label}
                  isPushed={!isMobile}
                  label={menuItem.label.toUpperCase()}
                  initialOpenState={menuItem.initialOpenState}
                  className={calloutClass}
                >
                  {!isMobile &&
                    menuItem.items.map((item) => (
                      <Link external href={item.href} key={item.label} style={{ textDecoration: 'none', marginTop: '8px' }}>
                        <Text fontSize='14px' bold>{item.label}</Text>
                      </Link>
                    ))}
                </Accordion>
              )
            }
            return (
              <Link href={menuItem.href} key={menuItem.label} style={{ textDecoration: 'none' }}>
                <Text fontSize='14px' bold>{menuItem.label}</Text>
              </Link>
            )
          })}
          <Socials>
            {socials.map((social) => {
              const Icon = Icons[social.icon]
              const iconProps = { width: social.icon === 'TelegramIcon' ? '28px' : '36px', color: '#ffffff', style: { cursor: 'pointer' }, marginLeft: '-16px', marginTop: '4px' }
              return (
                <Link external href={social.href} key={social.label} style={{ textDecoration: 'none' }}>
                  <Icon {...iconProps} />
                </Link>
              )
            })}
          </Socials>
          <UserBlock account={account} login={connect} logout={reset} />
        </MenuLabels>

          :
          <>
            <MenuButton onClick={handleMenuClick}>
              <HamburgerIcon width="64px" />
            </MenuButton>
            <UserBlockContainer>
              <UserBlock account={account} login={connect} logout={reset} isMobile={isMobile} />
            </UserBlockContainer>
          </>
        }
      </MenuItems>

      {isMobile && <MenuMobile isMobile={isMobile} onClose={handleMenuClick} isOpen={isMobileMenuActive} />}
    </Menubar>
  )
}

export default Menu