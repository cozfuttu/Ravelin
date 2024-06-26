import React from 'react'
import styled from 'styled-components'

const Back = styled.div`
  position: absolute;
  z-index: -1;

  @media (max-width: 1080px) {
    position: absolute;
    left: -180px;
    top: calc(30% + 8vh);
  }
`
const BlackBack = () => {
  return (
    <Back>
      <svg width="365" height="413" viewBox="0 0 365 413" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M358.737 229.785L266.093 390.031C257.887 404.227 242.711 412.971 226.299 412.971H0V0.699951H226.299C242.711 0.699951 257.887 9.44457 266.093 23.6399L358.737 183.886C366.943 198.081 366.943 215.57 358.737 229.785Z" fill="#2D3A4A" />
      </svg>
    </Back>
  )
}

export default BlackBack