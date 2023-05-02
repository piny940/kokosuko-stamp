import React, {
  ChangeEventHandler,
  CSSProperties,
  forwardRef,
  HTMLInputTypeAttribute,
} from 'react'
import styled from 'styled-components'

const Input = styled.input`
  background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity));
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: 0;
  font-size: var(--bs-body-font-size);

  :focus {
    background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity));
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: var(--bs-border-width) solid #86b7fe;
    box-shadow: none;
  }
`

export type FieldBaseProps = {
  value: string
  onChange: ChangeEventHandler
  className?: string
  placeholder?: string
  type: HTMLInputTypeAttribute
  style?: CSSProperties
  step?: number
}

const FieldBaseBase = (
  {
    value,
    onChange,
    className = '',
    placeholder,
    type,
    style,
    step,
  }: FieldBaseProps,
  ref?: any
) => {
  return (
    <Input
      ref={ref}
      type={type}
      className={'form-control rounded ' + className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={style}
      step={step}
    />
  )
}

export const FieldBase = forwardRef(FieldBaseBase)
