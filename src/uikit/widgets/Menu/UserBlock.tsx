import React from 'react'
import styled from 'styled-components'
import { useWalletModal } from '../WalletModal'
import { Login } from '../WalletModal/types'

const StyledButton = styled.button<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 120px;
  font-size: 16px;
  height: 50px;
  overflow: hidden;
  cursor: pointer;
  border: none;
  background: ${({ isMobile }) => isMobile ? '#007ABE' : 'linear-gradient(180deg, rgba(242, 242, 242, 1) 0%, rgba(203, 203, 203, 1) 100%)'};
  color: ${({ isMobile }) => isMobile ? '#F2F2F2' : '#4E4E4E'};
  font-weight: 700;
  border-radius: 8px;

  &:hover{
    transition: all 300ms linear;
    transform: scale(1.1);
  }
`

interface Props {
  account?: string
  isMobile?: boolean
  login: Login
  logout: () => void
}

const UserBlock: React.FC<Props> = ({ account, isMobile, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  return (
    <div>
      {account ? (
        <StyledButton
          onClick={() => {
            onPresentAccountModal()
          }}
          isMobile={isMobile}
        >
          {accountEllipsis}
        </StyledButton>
      ) : (
        <StyledButton
          onClick={() => {
            onPresentConnectModal()
          }}
          isMobile={isMobile}
        >
          CONNECT
        </StyledButton>
      )}
    </div>
  )
}

export default UserBlock
