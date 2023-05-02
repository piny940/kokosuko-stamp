import React, { ChangeEventHandler, forwardRef } from 'react'
import { FlexFieldBase } from './FlexFieldBase'

export type TextFieldProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  placeholder?: string
}

const TextFieldBase = (props: TextFieldProps, ref?: any) => {
  return <FlexFieldBase type="text" {...props} ref={ref} />
}

export const TextField = forwardRef(TextFieldBase)
