import React from 'react'
import styled from 'styled-components'
import { useWalletModal } from '../WalletModal'
import { Login } from '../WalletModal/types'

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 120px;
  font-size: 16px;
  height: 50px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(242, 242, 242, 1) 0%, rgba(203, 203, 203, 1) 100%);
  border: 4px solid #27514c;
  color: #4E4E4E;
  border-radius: 8px;

  &:hover{
    transition: 0.3s;
    font-size: 19px;
  }
`

interface Props {
  account?: string
  login: Login
  logout: () => void
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  return (
    <div>
      {account ? (
        <StyledButton
          onClick={() => {
            onPresentAccountModal()
          }}
        >
          {accountEllipsis}
        </StyledButton>
      ) : (
        <StyledButton
          onClick={() => {
            onPresentConnectModal()
          }}
        >
          CONNECT
        </StyledButton>
      )}
    </div>
  )
}

export default UserBlock
