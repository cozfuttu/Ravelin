import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 48 48" {...props}>
<g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
fill="#ffffff" stroke="none">
<path d="M78 342 c-30 -18 -58 -67 -58 -102 0 -98 125 -157 199 -94 86 72 38
214 -72 214 -23 0 -54 -8 -69 -18z"/>
<path d="M317 348 c-50 -39 -48 -191 3 -218 14 -8 25 -5 45 12 44 39 47 151 4
196 -23 25 -29 27 -52 10z"/>
<path d="M423 324 c-10 -25 -10 -143 0 -168 15 -38 29 1 29 84 0 83 -14 122
-29 84z"/>
</g>
    </Svg>
  )
}

export default Icon
