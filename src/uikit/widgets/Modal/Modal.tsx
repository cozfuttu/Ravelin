import React from 'react'
import styled from 'styled-components'
import Heading from '../../components/Heading/Heading'
import Flex from '../../components/Flex/Flex'
import { ArrowBackIcon, CloseIcon } from '../../components/Svg'
import { IconButton } from '../../components/Button'
import { InjectedProps } from './types'

interface Props extends InjectedProps {
  title: string
  hideCloseButton?: boolean
  onBack?: () => void
  isMobile?: boolean
  bodyPadding?: string
}

const StyledModal = styled.div`
  position: relative;
  background: linear-gradient(180deg, rgba(2,0,36,1) 0%, #006c81 100%);
  box-shadow: 0 0 16px #00e0a0;
  border: 1px solid rgba(0,212,255,1);
  border-radius: 32px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: 360px;
    max-width: 100%;
  }
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  padding: 12px 24px;
`

const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`

const ModalImage = styled.img`
`

const Modal: React.FC<Props> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  isMobile = false,
  bodyPadding = '24px',
}) => (
  <StyledModal style={{ width: isMobile && '90%', height: isMobile && '90%' }}>
    {
      title.includes('/images') ?
        <>
          <ModalImage src={title} style={{ maxWidth: isMobile ? '100%' : '700px' }} />
          {!hideCloseButton && (
            <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog" style={{ position: 'absolute', right: '5px' }}>
              <CloseIcon color="primary" />
            </IconButton>
          )}
        </>
        :
        <ModalHeader>
          <ModalTitle>
            {onBack && (
              <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
                <ArrowBackIcon color="primary" />
              </IconButton>
            )}
            <Heading>{title}</Heading>
          </ModalTitle>
          {!hideCloseButton && (
            <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
              <CloseIcon color="primary" />
            </IconButton>
          )}
        </ModalHeader>
    }
    <Flex flexDirection="column" p={bodyPadding}>
      {children}
    </Flex>
  </StyledModal>
)

export default Modal
