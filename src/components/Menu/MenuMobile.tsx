import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Dropdown, Link, Text } from 'uikit'
import ReviewProofBadgeRugdoc from 'uikit/components/ReviewProofBadge'
import ReviewBadgePaladin from 'uikit/components/ReviewProofBadge/ReviewProofBadgePaladin'
import { SvgProps, CloseIcon } from 'uikit/components/Svg'
import { IconButton } from 'uikit/components/Button'
import * as IconModule from 'uikit/widgets/Menu/icons'
import config, { socials } from './config'
import MenuLink from 'uikit/widgets/Menu/MenuLink'
import { LinkLabel, MenuEntry } from './MenuEntry'

const OuterContainer = styled.div`
  display: flex;
//  padding-top: 80px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-image: url("images/other/MenuBg.svg");
  background-repeat: no-repeat;
  background-position: right top;
  background-size: inherit;
  transform: rotate(0deg);
  background-color: #00000040;
  z-index: 10;

  @media (max-width: 1080px) {
    padding-top: 80px;
  }
`

const ItemsContainer = styled.div`
  display: flex;
  padding-top: 12%;
  padding-right: 64px;
  padding-bottom: 10%;
  height: 43%;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  gap: 48px;
  align-items: flex-end;
  align-self: center;
  z-index: 999;
  font-family: 'Inter', sans-serif;
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
  right: 16px;
  top: 8px;
`

const AccordionDivider = styled.div`
  background-color: #0000009f;
  width: 40%;
  height: 1px;
  margin-top: 16px;
`

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> }

interface Props {
  isMobile: boolean
  onClose: () => void
}

const MenuMobile: React.FC<Props> = ({ isMobile, onClose }) => {
  const location = useLocation()

  return (
    <OuterContainer onClick={onClose}>

      <CloseIconContainer>
        <IconButton variant="text" onClick={onClose} aria-label="Close the dialog">
          <CloseIcon color="#d3d3d3" />
        </IconButton>
      </CloseIconContainer>

      <ItemsContainer >
        {config.map((entry) => {
          const calloutClass = entry.calloutClass ? entry.calloutClass : undefined
          if (entry.items) return
          return (
            <>
              <MenuEntry key={entry.label} className={calloutClass}>
                <MenuLink onClick={onClose} href={entry.href} style={{ textDecoration: 'none' }}>
                  <LinkLabel>{entry.label.toUpperCase()}</LinkLabel>
                </MenuLink>
              </MenuEntry>
            </>
          )
        })}
        <SocialContainer>
          {
            socials.map((social, index) => {
              const Icon = Icons[social.icon]
              const iconProps = { width: social.icon === 'TelegramIcon' ? '28px' : '36px', color: '#ffffff', style: { cursor: 'pointer' } }
              const mr = index < socials.length - 1 ? '20px' : 0

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
