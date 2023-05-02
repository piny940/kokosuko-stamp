import React, { ChangeEventHandler, forwardRef } from 'react'
import styled from 'styled-components'

const CheckboxInput = styled.input`
  background-color: var(--bs-secondary-bg-rgb);

  :checked {
    background-color: #2b6bff;
    border-color: #2b6bff;
  }
`

export interface SwitchFieldProps {
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
}

const SwitchFieldBase = (
  { className, checked, onChange }: SwitchFieldProps,
  ref?: any
) => {
  return (
    <div className="form-check form-switch" style={{ fontSize: '20px' }}>
      <CheckboxInput
        ref={ref}
        type="checkbox"
        className={'form-check-input ' + className}
        checked={checked}
        onChange={onChange}
      />
    </div>
  )
}

export const SwitchField = forwardRef(SwitchFieldBase)
