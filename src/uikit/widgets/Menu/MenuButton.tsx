import styled from 'styled-components'
import Button from '../../components/Button/Button'

const MenuButton = styled(Button)`
  position: absolute;
  left: 10px;
  top: 30px;
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 8px;
  border-radius: 8px;
`

MenuButton.defaultProps = {
  variant: 'text',
  size: 'sm',
}

export default MenuButton
