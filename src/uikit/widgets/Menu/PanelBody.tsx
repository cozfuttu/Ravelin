import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Link, Text, Skeleton, Flex, Dropdown } from 'uikit'
import { SvgProps, PancakeRoundIcon } from '../../components/Svg'
import * as IconModule from './icons'
import { MenuEntry, LinkLabel } from './MenuEntry'
import MenuLink from './MenuLink'
import Accordion from './Accordion'
import MenuButton from './MenuButton'
import { PanelProps, PushedProps } from './types'
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from './icons'
import { socials } from './config'
import MenuMobile from './MenuMobile'
import UserBlock from './UserBlock'

interface Props extends PanelProps, PushedProps {
  isMobile: boolean
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> }

const Container = styled.div`
  display: flex;
  bottom: 0;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 80vw;
  height: 140px;
  margin-left: auto;
  margin-right: auto;
`

const Logo = styled.img`
  width: 130px;
  margin-left: 50px;
  margin-right: 50px;
  object-fit: cover;
`

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  text-align: center;
`
const Trapezoid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 300px;
  height: 50px;
  overflow: hidden;
  background: #27514c;
  border-radius: 8px;
`

const WalletButtonContainer = styled.nav`
`

const SocialButtonContainer = styled.nav`
  display: flex;
  margin-bottom: 8px;
`

const Banner = styled.img`
  width: 90%;
`

const AccordionDivider = styled.div`
  background-color: #15403c;
  width: 70%;
  margin: 8px auto;
  height: 1px;
  margin-top: 16px;
`

const StyledText = styled.text`
  font-size: 18px;
  font-weight: bold;
  color: #ededed;
  transition: 0.3s;
  &:hover {
    font-size: 20px;
  }
`

const PanelBody: React.FC<Props> = (props) => {
  const { account, login, logout, isPushed, isMobile, links } = props
  const [isMobileMenuActive, setMobileMenuActive] = useState(false)

  const location = useLocation()

  const { cakePriceUsd, GbntPriceUsd } = props

  const openMobileMenu = () => {
    setMobileMenuActive(true)
  }

  const closeMobileMenu = () => {
    setMobileMenuActive(false)
  }

  return (
    <>
      <Container>
        {isMobile && <MenuButton onClick={openMobileMenu}>
          <HamburgerIcon width="24px" color="textSubtle" />
        </MenuButton>}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Banner src='/images/banners/PolypulsarLogo.png' />
        </div>

        {isMobileMenuActive && <MenuMobile {...props} onClose={closeMobileMenu} />}

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1vw' }}>
          {!isMobile && links.map((entry, i) => {
            const calloutClass = entry.calloutClass ? entry.calloutClass : undefined

            if (entry.items) {
              return (
                <Accordion
                  key={entry.label}
                  isPushed={isPushed}
                  label={entry.label.toUpperCase()}
                  initialOpenState={entry.initialOpenState}
                  className={calloutClass}
                  color={entry.color}
                >
                  {isPushed &&
                    entry.items.map((item, index) => (
                      <>
                        {index !== 0 && item.isHeader && <AccordionDivider />}
                        <MenuEntry style={{ marginTop: index !== 0 ? '16px' : '0px', color: '#ededed', cursor: item.isHeader ? 'default' : 'pointer' }} key={item.label} secondary>
                          {
                            !(item.isHeader) ?
                              <MenuLink href={item.href} target={item.target} color={item.color} key={item.label}>
                                {item.label}
                              </MenuLink>
                              :
                              <Text color='#111514'>
                                {item.label.toUpperCase()}
                              </Text>
                          }
                        </MenuEntry>
                      </>
                    ))}
                </Accordion>
              )
            }
            return (
              <MenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass} style={{ marginBottom: '12px', color: '#ededed' }}>
                <MenuLink href={entry.href} color={entry.color} key={entry.label}>
                  {entry.label.toUpperCase()}
                </MenuLink>
              </MenuEntry>
            )
          })}
        </div>
        {!isMobile ?
          <>
            <SocialButtonContainer>
              {
                socials.map((social, index) => {
                  const Icon = Icons[social.icon]
                  const iconProps = { width: '24px', color: '#146459', style: { cursor: 'pointer' } }
                  const mr = index < socials.length - 1 ? '20px' : 0

                  if (social.items) {
                    return (
                      <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>
                        {social.items.map((item) => (
                          <Link external key={item.label} href={item.href} aria-label={item.label} color="#ffffff" style={{ fontWeight: 'normal' }}>
                            {item.label}
                          </Link>
                        ))}
                      </Dropdown>
                    )
                  }
                  return (
                    <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
                      <Icon {...iconProps} />
                    </Link>
                  )
                })
              }
            </SocialButtonContainer>
            <WalletButtonContainer>
              <UserBlock account={account} login={login} logout={logout} />
            </WalletButtonContainer>
          </>
          :
          <>

          </>
        }
      </Container>
    </>
  )
}

export default PanelBody
