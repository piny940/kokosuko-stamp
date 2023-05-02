import React, {
  ChangeEventHandler,
  forwardRef,
  HTMLInputTypeAttribute,
} from 'react'
import { FieldBase } from './FieldBase'

export type FlexFieldBase = {
  type: HTMLInputTypeAttribute
  value: string
  onChange: ChangeEventHandler
  className?: string
  placeholder?: string
  step?: number
}

const FlexFieldBaseBase = (props: FlexFieldBase, ref?: any) => {
  return <FieldBase style={{ flex: '1 1 auto' }} {...props} ref={ref} />
}

export const FlexFieldBase = forwardRef(FlexFieldBaseBase)
