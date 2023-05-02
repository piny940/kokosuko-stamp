import React, { ChangeEventHandler, forwardRef } from 'react'
import { FlexFieldBase } from './FlexFieldBase'

export type NumberFieldProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  placeholder?: string
}

const NumberFieldBase = (props: NumberFieldProps, ref?: any) => {
  return <FlexFieldBase type="number" {...props} ref={ref} />
}

export const NumberField = forwardRef(NumberFieldBase)
