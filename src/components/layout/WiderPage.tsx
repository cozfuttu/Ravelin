import styled from 'styled-components'
import WiderContainer from './WiderContainer'

const Page = styled(WiderContainer)`
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
`

export default Page
