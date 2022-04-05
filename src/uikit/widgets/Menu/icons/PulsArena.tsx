import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" fill="#0DEAEA" stroke="none">
        <path
          d="M5 218 c4 -12 25 -42 47 -64 25 -26 36 -44 29 -48 -8 -5 -7 -11 2
-21 10 -12 14 -12 23 1 10 12 13 12 24 0 9 -12 15 -13 25 -3 11 10 10 15 -3
31 -10 11 -12 17 -6 13 13 -8 79 60 89 91 6 22 5 23 -17 17 -12 -4 -40 -23
-60 -43 l-38 -36 -37 36 c-21 20 -49 39 -61 43 -22 6 -23 5 -17 -17z"
        />
        <path
          d="M30 102 c0 -4 5 -13 11 -19 9 -9 4 -18 -16 -38 -18 -19 -23 -31 -16
-38 7 -7 18 -2 37 16 21 21 30 25 41 16 23 -20 25 -4 2 25 -22 28 -59 52 -59
38z"
        />
        <path
          d="M164 76 c-20 -20 -34 -39 -31 -43 4 -3 13 -1 20 6 11 9 20 5 41 -16
37 -37 58 -17 22 22 -20 22 -23 31 -15 42 7 7 9 16 6 20 -4 3 -23 -11 -43 -31z"
        />
      </g>
    </Svg>
  )
}

export default Icon
