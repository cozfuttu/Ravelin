import React from 'react'
import styled from 'styled-components'

const Back = styled.div`
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`

const BondGraphic = () => {
  return (
    <Back>
      <svg width="583" height="245" viewBox="0 0 583 245" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_602_19)">
          <path d="M463.228 -248.062C450.045 -270.921 425.705 -285 399.368 -285H185.632C159.264 -285 134.955 -270.921 121.772 -248.062L14.8878 -62.7221C1.70406 -39.8627 1.70406 -11.7352 14.8878 11.0933L121.772 196.433C134.955 219.292 159.295 233.371 185.632 233.371H399.368C425.736 233.371 450.045 219.292 463.228 196.433L570.112 11.0933C583.296 -11.7352 583.296 -39.8935 570.112 -62.7221L463.228 -248.062Z" fill="#F2F2F2" />
        </g>
        <defs>
          <clipPath id="clip0_602_19">
            <rect width="583" height="245" fill="white" />
          </clipPath>
        </defs>
      </svg>

    </Back>
  )
}

export default BondGraphic