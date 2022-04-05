import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { LogoIcon } from '../../components/Svg'
import Flex from '../../components/Flex/Flex'
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from './icons'
import MenuButton from './MenuButton'

interface Props {
  isPushed: boolean
  isDark: boolean
  togglePush: () => void
  href: string
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .desktop-icon {
    width: 156px;
    margin-left: -30px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
      margin-left: 0px;
    }
  }
`

const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href }) => {
  const isAbsoluteUrl = href.startsWith('https')
  const innerLogo = (
    <>
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  )

  return (
    <Flex>
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Gamme Pulsar home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink to={href} aria-label="Gamme Pulsar home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  )
}

export default Logo
