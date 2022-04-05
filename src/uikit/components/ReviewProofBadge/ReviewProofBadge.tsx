import React from 'react'
import styled from 'styled-components'

const StyledImage = styled.img`
  height: 6vh;
`

const ReviewBadge = () => {
  return (
    <a target="_blank" rel="noopener noreferrer" href="https://rugdoc.io/project/polypulsar-gamma/">
      <StyledImage src="https://rugdoc.io/assets/2021/06/rugdoc-review-badge-with-glow.png" />
    </a>
  )
}

export default ReviewBadge
