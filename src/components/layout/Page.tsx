import styled from 'styled-components'
import Container from './Container'

const Page = styled(Container)`
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
