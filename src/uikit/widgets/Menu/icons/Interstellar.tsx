import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 64 43" {...props}>
      <g transform="translate(0.000000,43.000000) scale(0.100000,-0.100000)" stroke="none" fill="#F0DC0D">
      <path d="M215 411 c-39 -17 -105 -81 -105 -101 0 -18 -26 -10 -48 13 -25 27
-20 37 18 37 15 0 35 9 45 20 18 20 17 20 -32 20 -101 0 -121 -58 -43 -120 36
-28 40 -36 40 -76 0 -25 9 -61 19 -82 72 -139 248 -163 348 -48 30 33 36 36
71 30 24 -4 51 0 75 10 53 22 50 53 -9 105 -26 23 -50 41 -54 41 -17 0 5 -51
33 -76 l30 -27 -24 -9 c-13 -5 -34 -6 -46 -3 -21 5 -23 11 -23 66 0 159 -155
264 -295 200z m137 -31 c45 -13 105 -77 113 -123 11 -59 3 -91 -25 -97 -29 -7
-41 -40 -14 -40 14 0 12 -6 -11 -30 -57 -59 -158 -63 -221 -7 -42 37 -64 76
-64 116 l0 30 62 -29 c46 -22 64 -26 70 -17 13 21 10 24 -57 56 -36 16 -65 35
-65 40 0 6 16 29 36 51 49 54 103 70 176 50z"/>
<path d="M317 213 c-29 -7 -41 -51 -22 -79 28 -43 95 -19 95 34 0 18 -35 54
-50 51 -3 -1 -13 -3 -23 -6z"/>
      </g>
    </Svg>
  )
}

export default Icon
