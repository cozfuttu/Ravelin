import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'
import Overlay from '../../components/Overlay/Overlay'
import { useMatchBreakpoints } from '../../hooks'
import Panel from './Panel'
import { NavProps } from './types'

import { MENU_HEIGHT } from './config'

const Wrapper = styled.div`
  width: 100%;
  height: 140px;
  border-bottom: 6px solid #27514c;
  background-color: #111514;
`

const BodyWrapper = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  overflow-x: hidden;
`

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s;
`

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  GbntPriceUsd,
  links,
  priceLink,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  const [isPushed, setIsPushed] = useState(!isMobile)
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === 'Home')

  return (
    <Wrapper>
      <BodyWrapper>
        <Panel
            account={account}
            login={login}
            logout={logout}
            isPushed={isPushed}
            isMobile={isMobile}
            showMenu={showMenu}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            GbntPriceUsd={GbntPriceUsd}
            links={links}
            priceLink={priceLink}
          />          
          <Inner isPushed={isPushed} showMenu={showMenu}>
            {children}
          </Inner>
      </BodyWrapper>
    </Wrapper>
  )
}

export default Menu
