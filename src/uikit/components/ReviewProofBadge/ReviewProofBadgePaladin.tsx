import React from 'react'
import styled from 'styled-components'
import { Flex } from 'uikit'

const StyledImage = styled.img`
  height: 3.6vh;
  max-height: 120px;
`

const ReviewBadgePaladin = () => {
  return (
    <a target="_blank" rel="noopener noreferrer" href="https://paladinsec.co/projects/polypulsar-games/">
      <StyledImage src="https://paladinsec.co/pld/assets/audited-by-paladin-standard.png" />
    </a>
  )
}

export default ReviewBadgePaladin
