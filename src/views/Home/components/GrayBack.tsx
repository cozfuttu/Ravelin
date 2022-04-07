import React from 'react'
import styled from 'styled-components'

const Back = styled.div`
  z-index: -3;
  display: block;
`

const GrayBack = () => {
  return (
    <Back>
      <svg width="1900" height="564" viewBox="0 0 1900 564" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
        <path d="M1900 184.831V378.82H452.362C441.349 378.82 431.179 384.702 425.721 394.251L341.461 541.321C333.608 555.046 319.001 563.516 303.178 563.516H0V0.135498H303.178C319.001 0.135498 333.608 8.60561 341.461 22.3303L425.721 169.401C431.199 178.949 441.349 184.831 452.362 184.831H1900Z" fill="url(#paint0_linear_53_29)" />
        <defs>
          <linearGradient id="paint0_linear_53_29" x1="-3.9527e-05" y1="0.000142461" x2="1915.5" y2="847" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E6E6E6" />
            <stop offset="1" stopColor="#E6E6E6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </Back>
  )
}

export default GrayBack