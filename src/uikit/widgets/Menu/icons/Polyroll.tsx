import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
<g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
fill="#0DEAEA" stroke="none">
<path d="M92 304 c-107 -55 -121 -198 -26 -271 96 -73 238 -10 251 111 14 119
-120 214 -225 160z m124 -78 c57 -57 68 -93 40 -122 -19 -19 -56 -18 -56 1 0
8 -7 15 -15 15 -10 0 -15 -10 -15 -30 0 -20 5 -30 15 -30 8 0 15 -4 15 -10 0
-5 -18 -10 -40 -10 -22 0 -40 5 -40 10 0 6 7 10 15 10 9 0 15 9 15 25 0 16 -6
25 -15 25 -8 0 -15 -4 -15 -9 0 -18 -38 -18 -54 0 -18 21 -22 79 -6 79 6 0 10
7 10 15 0 8 5 15 11 15 14 0 39 25 39 39 0 6 7 11 15 11 8 0 15 5 15 10 0 18
10 11 66 -44z"/>
</g>
    </Svg>
  )
}

export default Icon
