import React, { cloneElement, Children, ReactElement } from 'react'
import StyledButtonMenu from './StyledButtonMenu'
import { sizes, variants } from '../Button/types'
import { ButtonMenuProps, ButtonMenuItemProps } from './types'

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  activeIndex = 0,
  size = sizes.MD,
  variant = variants.PRIMARY,
  isMobile,
  onClick,
  children,
}) => {
  return (
    <StyledButtonMenu variant={variant} style={{ flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: 'space-between' }}>
      {Children.map(children, (child: ReactElement<ButtonMenuItemProps>, index) => {
        return cloneElement(child, {
          isActive: activeIndex === index,
          onClick: onClick ? () => onClick(index) : undefined,
          size,
          variant,
        })
      })}
    </StyledButtonMenu>
  )
}

export default ButtonMenu
