import React from 'react'
import styled from 'styled-components'

const Back = styled.div`
  position: absolute;
  z-index: -2;
  left: 64px;
`

const BlueBack = () => {
  return (
    <Back>
      <svg width="383" height="344" viewBox="0 0 383 344" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M120.96 343.561H262.939C280.451 343.561 296.608 334.229 305.364 319.092L376.353 196.295C385.109 181.159 385.109 162.513 376.353 147.376L305.364 24.5791C296.608 9.44268 280.431 0.109863 262.939 0.109863H120.96C103.448 0.109863 87.2907 9.44268 78.5348 24.5791L7.5452 147.376C-1.2107 162.513 -1.2107 181.159 7.5452 196.295L78.5348 319.092C87.2907 334.229 103.467 343.561 120.96 343.561Z" fill="#158BCE" />
      </svg>
    </Back>
  )
}

export default BlueBack