import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Dropdown, Link, Text } from 'uikit'
import ReviewProofBadgeRugdoc from 'uikit/components/ReviewProofBadge'
import ReviewBadgePaladin from 'uikit/components/ReviewProofBadge/ReviewProofBadgePaladin'
import { SvgProps, CloseIcon } from '../../components/Svg'
import { IconButton } from '../../components/Button'
import * as IconModule from './icons'
import MenuLink from './MenuLink'
import { socials } from './config'
import AccordionMobile from './AccordionMobile'
import { MenuEntry, LinkLabel } from './MenuEntry'
import { PanelProps, PushedProps } from './types'

const OuterContainer = styled.div`
  display: flex;
  padding-top: 80px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #141414;
`

const ItemsContainer = styled.div`
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  width: 70%;
  align-items: flex-start;
`

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
  margin-left: 32px;
`

const Logo = styled.img`
  width: 130px;
  align-self: center;
  object-fit: cover;
`

const CloseIconContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 25px;
`

const AccordionDivider = styled.div`
  background-color: #00fab39f;
  width: 70%;
  margin: 8px auto;
  height: 1px;
  margin-top: 16px;
`

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> }

interface Props extends PanelProps, PushedProps {
  isMobile: boolean
  onClose: () => void
}

const MenuMobile: React.FC<Props> = ({ isPushed, links, onClose }) => {
  const [isExpended, setExpended] = useState(false)
  const location = useLocation()

  return (
    <OuterContainer>
      <Link href='/'>
        <Logo src='/images/egg/SmallPulsarBanner.png' />
      </Link>

      <CloseIconContainer>
        <IconButton variant="text" onClick={onClose} aria-label="Close the dialog">
          <CloseIcon color="#75706a" />
        </IconButton>
      </CloseIconContainer>

      <ItemsContainer>
        {links.map((entry) => {
          const Icon = Icons[entry.icon]
          const iconElement = <Icon width="32px" mr="10px" />
          const calloutClass = entry.calloutClass ? entry.calloutClass : undefined

          if (entry.items) {
            return (
              <AccordionMobile
                key={entry.label}
                isPushed={isExpended}
                label={entry.label.toUpperCase()}
                initialOpenState={entry.initialOpenState}
                className={calloutClass}
              >
                {entry.items.map((item, index) => (
                  <>
                    {index !== 0 && item.isHeader && <AccordionDivider />}
                    <MenuEntry key={item.href} secondary style={{ marginLeft: '16px' }} >
                      {
                        !(item.isHeader) ?
                          <MenuLink onClick={onClose} href={item.href} target={item.target}>
                            {item.label}
                          </MenuLink>
                          :
                          <Text color='#1f857a'>
                            {item.label.toUpperCase()}
                          </Text>
                      }
                    </MenuEntry>
                  </>
                ))}
              </AccordionMobile>
            )
          }
          return (
            <MenuEntry key={entry.label} className={calloutClass}>
              <MenuLink onClick={onClose} href={entry.href}>
                <LinkLabel isPushed={isPushed}>{entry.label.toUpperCase()}</LinkLabel>
              </MenuLink>
            </MenuEntry>
          )
        })}
        <SocialContainer>
          {
            socials.map((social, index) => {
              const Icon = Icons[social.icon]
              const iconProps = { width: '24px', color: 'textSubtle', style: { cursor: 'pointer' } }
              const mr = index < socials.length - 1 ? '20px' : 0

              if (social.items) {
                return (
                  <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>
                    {social.items.map((item) => (
                      <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
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
        </SocialContainer>
      </ItemsContainer>
    </OuterContainer>
  )
}

export default MenuMobile
