import styled from 'styled-components'
import WideContainer from './WideContainer'

const Page = styled(WideContainer)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 20vh;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 20vh;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 20vh;
  }

  @media (min-width: 1080px) {
    margin-top: 96px;
  }
`

export default Page
