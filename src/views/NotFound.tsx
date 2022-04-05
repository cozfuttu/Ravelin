import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { Button, Heading, Text, LogoIcon } from 'uikit'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound = () => {

  return (
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Heading size="xxl">404</Heading>
        <Text mb="16px">Page not found, sorry!</Text>
        <Button as="a" href="/" size="sm">
          Back Home
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
