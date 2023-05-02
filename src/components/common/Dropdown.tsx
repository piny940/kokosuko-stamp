import React from 'react'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { ActionButton } from './ActionButton'

const DropdownMenuDiv = styled.div`
  font-size: var(--bs-body-font-size);
`

export type DropdownProps = {
  children: ReactNode
  togglerLabel: string
  togglerBgColor: string
  togglerTextColor?: string
  togglerBorderColor?: string
  togglerSize?: number
  togglerOptions?: any
  dropdownWidth?: string
  dropdownHeight?: string
  dropdownClassName?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  togglerBgColor,
  togglerLabel,
  togglerTextColor,
  togglerBorderColor,
  togglerSize,
  togglerOptions,
  dropdownWidth,
  dropdownHeight,
  dropdownClassName,
}) => {
  const defaultTogglerOptions = {
    'data-bs-toggle': 'dropdown',
    'aria-expanded': 'false',
  }

  return (
    <div className="dropdown">
      <ActionButton
        bgColor={togglerBgColor}
        label={togglerLabel}
        textColor={togglerTextColor}
        borderColor={togglerBorderColor}
        size={togglerSize}
        options={{
          ...defaultTogglerOptions,
          ...togglerOptions,
        }}
      />
      <DropdownMenuDiv
        className={
          'dropdown-menu position-fixed bg-body-tertiary ' + dropdownClassName
        }
        style={{ width: dropdownWidth, height: dropdownHeight }}
      >
        {children}
      </DropdownMenuDiv>
    </div>
  )
}
