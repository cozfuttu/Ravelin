import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" stroke="none">
        <path
          d="M63 211 c-40 -25 -50 -60 -33 -114 17 -58 47 -87 90 -87 52 0 100 63
100 131 0 70 -92 111 -157 70z m117 -21 c29 -29 25 -130 -5 -130 -7 0 -15 -7
-19 -15 -3 -8 -17 -15 -30 -15 -66 0 -113 113 -67 159 28 28 93 29 121 1z"
        />
        <path d="M67 124 c-16 -16 -7 -44 14 -44 15 0 20 5 17 22 -3 22 -19 33 -31 22z" />
        <path
          d="M147 123 c-15 -14 -7 -43 12 -43 23 0 34 23 18 39 -13 13 -21 14 -30
4z"
        />
        <path
          d="M105 60 c-3 -5 3 -10 15 -10 12 0 18 5 15 10 -3 6 -10 10 -15 10 -5
0 -12 -4 -15 -10z"
        />
      </g>
    </Svg>
  )
}

export default Icon
