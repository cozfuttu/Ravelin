import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" stroke="none">
        <path
          d="M24 227 c-2 -7 -3 -60 -2 -118 l3 -104 95 0 95 0 0 115 0 115 -93 3
c-70 2 -94 0 -98 -11z m166 -107 l0 -90 -70 0 -70 0 0 90 0 90 70 0 70 0 0
-90z"
        />
        <path d="M80 170 c-8 -5 -11 -12 -7 -16 4 -4 15 0 24 9 18 18 8 23 -17 7z" />
        <path d="M133 163 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z" />
        <path d="M80 120 c-8 -5 -11 -12 -7 -16 4 -4 15 0 24 9 18 18 8 23 -17 7z" />
        <path d="M133 113 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z" />
        <path d="M80 70 c-8 -5 -11 -12 -7 -16 4 -4 15 0 24 9 18 18 8 23 -17 7z" />
        <path d="M133 63 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z" />
      </g>
    </Svg>
  )
}

export default Icon
