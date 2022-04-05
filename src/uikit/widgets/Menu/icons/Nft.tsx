import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" stroke="none">
        <path
          d="M71 206 c-87 -48 -50 -186 49 -186 51 0 100 49 100 99 0 75 -83 124
-149 87z m102 -44 c-6 -4 -13 -23 -15 -42 -3 -33 -6 -35 -43 -40 l-41 -6 6 41
c5 38 7 40 45 46 60 9 61 9 48 1z"
        />
      </g>
    </Svg>
  )
}

export default Icon
