import React, { ChangeEventHandler } from 'react'
import { NumberField } from '../common/NumberField'

export type OffsetFormProps = {
  message: string
  offset: string
  onOffsetChange: ChangeEventHandler<HTMLInputElement>
}

export const OffsetForm: React.FC<OffsetFormProps> = ({
  message,
  offset,
  onOffsetChange,
}) => {
  return (
    <div className="d-flex px-2 flex-column align-items-end">
      <label className="d-flex align-items-center w-100">
        <span className="flex-shrink-0">オフセット</span>
        <NumberField value={offset} onChange={onOffsetChange} />
      </label>
      <span className="text-success me-2">{message}</span>
    </div>
  )
}
