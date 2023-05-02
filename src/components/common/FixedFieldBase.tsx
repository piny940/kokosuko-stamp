import React, {
  ChangeEventHandler,
  forwardRef,
  HTMLInputTypeAttribute,
} from 'react'
import { FieldBase } from './FieldBase'

export type FixedFieldBase = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  width: string
  type: HTMLInputTypeAttribute
  className?: string
  placeholder?: string
  step?: number
}

const FixedFieldBaseBase = (props: FixedFieldBase, ref?: any) => {
  return (
    <FieldBase
      {...props}
      ref={ref}
      style={{ width: props.width, flex: '0 0 auto' }}
    />
  )
}

export const FixedFieldBase = forwardRef(FixedFieldBaseBase)
