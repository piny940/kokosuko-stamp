import React, { ChangeEventHandler, forwardRef } from 'react'
import { FixedFieldBase } from './FixedFieldBase'

export type TimeFieldProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  step?: number
}

const TimeFieldBase = (props: TimeFieldProps, ref?: any) => {
  return <FixedFieldBase type="time" width="100px" {...props} ref={ref} />
}

export const TimeField = forwardRef(TimeFieldBase)
