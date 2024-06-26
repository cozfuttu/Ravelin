import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <path d="M0.593078 8.86613L21.3753 0.0950254C22.2209 -0.261844 23.1341 0.438464 22.9843 1.32872L20.0423 18.8575C19.8798 19.8283 18.7533 20.3147 17.9116 19.7785L10.1542 14.8303C9.4427 14.3765 9.31448 13.4066 9.8841 12.7898L17.021 5.76559C17.1727 5.61594 16.975 5.37899 16.7958 5.49602L7.16423 11.7374C6.31274 12.3168 5.22146 12.4387 4.2584 12.0626L0.617546 10.6409C-0.193816 10.3243 -0.209476 9.20382 0.593078 8.86613Z" fill="#F2F2F2" />
    </Svg>
  )
}

export default Icon
