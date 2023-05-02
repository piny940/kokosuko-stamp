import React, { ChangeEventHandler, forwardRef, ReactNode } from 'react'
import styled from 'styled-components'

const Select = styled.select`
  background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity));
  font-size: var(--bs-body-font-size);

  :focus {
    background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity));
  }
`

export type SelectFieldProps = {
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  className?: string
  children: ReactNode
}

const SelectFieldBase = (
  { value, onChange, className = '', children }: SelectFieldProps,
  ref?: any
) => {
  return (
    <Select
      ref={ref}
      className={'form-select ' + className}
      value={value}
      onChange={onChange}
    >
      {children}
    </Select>
  )
}

export const SelectField = forwardRef(SelectFieldBase)
