import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 22 22" {...props}>
      <g transform="translate(-1.100000,24.000000) scale(0.100000,-0.100000)" stroke="none">
        <path
          d="M16 194 c-18 -18 -22 -104 -6 -135 10 -17 22 -19 110 -19 115 0 120
4 120 89 0 72 -13 81 -120 81 -67 0 -92 -4 -104 -16z m200 -27 c3 -13 4 -41 2
-63 l-3 -39 -95 0 -95 0 -3 48 c-5 70 5 77 104 77 79 0 84 -1 90 -23z"
        />
        <path
          d="M90 120 c0 -46 1 -46 41 -23 35 21 36 27 7 47 -37 26 -48 20 -48 -24z
m40 6 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z"
        />
      </g>
    </Svg>
  )
}

export default Icon
