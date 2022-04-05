/* eslint no-unused-expressions: "off" */
import styled from 'styled-components'
import WideContainer from './WideContainer'

const Page = ( partner ) => { styled.div`
  min-height: calc(100vh - 64px);
  width: 100%;
  height: 100%;
  max-width: 3840px;
  max-height: 2160px;
  background-image: url(${partner === 'stadiumArcadium' ? 'images/partners/StadiumArcadiumBackground.webp' : 'images/partners/StadiumArcadiumBackground.webp'});
  background-color: #000000bb;
  background-repeat: no-repeat;
  background-position: top right;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 20vh;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 20vh;
  }
`}

export default Page
