import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

interface LogoProps extends SvgProps {
  isDark: boolean
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  return (
    <Svg viewBox="0 0 205 30" {...props}>
      <image width="205" height="30" href="/images/egg/SmallPulsarBanner.png" />
    </Svg>
  )
}

export default Logo
