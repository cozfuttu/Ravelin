import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
fill="#ffffff" stroke="none">
<path d="M95 306 c-113 -52 -127 -204 -25 -274 39 -26 50 -28 50 -7 0 8 -7 15
-15 15 -8 0 -25 12 -39 27 -28 30 -26 45 2 20 20 -19 48 -22 57 -8 3 5 -3 12
-14 16 -40 12 -54 41 -47 97 l7 53 89 0 89 0 7 -53 c7 -55 -7 -85 -45 -97 -13
-4 -16 -14 -13 -45 2 -22 7 -40 12 -40 4 0 22 10 40 22 93 64 91 191 -2 261
-34 25 -113 32 -153 13z"/>
</g>
    </Svg>
  )
}

export default Icon
