import React, { forwardRef, useImperativeHandle, useRef, Ref } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { TextField } from '../components/common/TextField'
import { TimeField } from '../components/common/TimeField'
import { Stamp } from '../resources/types'

const TimeFieldSpan = styled.span`
  padding: 0.375rem 0.75rem;
`

const TextDiv = styled.div`
  flex: 1 1 auto;
  height: 27px;
  padding: 0.375rem 0.75rem;
  overflow: hidden;
`

export type StampEditProps = {
  editingField: 'time' | 'text'
  setEditingField: (field: 'time' | 'text') => void
  initialStamp: Stamp
  updateStamp: (stamp: Stamp) => void
}

const StampEditBase = (
  { initialStamp, updateStamp, editingField, setEditingField }: StampEditProps,
  ref?: Ref<{
    time: () => HTMLInputElement | null
    text: () => HTMLInputElement | null
  }>
) => {
  const [stampField, setStampField] = useState<Stamp>(initialStamp)
  const timeInput = useRef<HTMLInputElement>(null)
  const textInput = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    time: () => timeInput.current,
    text: () => textInput.current,
  }))

  const onTimeSpanClick = () => {
    setEditingField('time')
    setTimeout(() => {
      timeInput.current?.focus()
    })
  }
  const onTextDivClick = () => {
    setEditingField('text')
    setTimeout(() => {
      textInput.current?.focus()
    })
  }

  return (
    <div className="d-flex flex-grow-1">
      {editingField === 'time' ? (
        <TimeField
          ref={timeInput}
          value={stampField.time}
          onChange={(e) => {
            setStampField({ ...stampField, time: e.target.value })
            updateStamp({ ...stampField, time: e.target.value })
          }}
          step={1}
        />
      ) : (
        <TimeFieldSpan onClick={onTimeSpanClick}>
          {stampField.time}
        </TimeFieldSpan>
      )}
      {editingField === 'text' ? (
        <TextField
          ref={textInput}
          value={stampField.text}
          onChange={(e) => {
            setStampField({ ...stampField, text: e.target.value })
            updateStamp({ ...stampField, text: e.target.value })
          }}
        />
      ) : (
        <TextDiv onClick={onTextDivClick}>{stampField.text}</TextDiv>
      )}
    </div>
  )
}

export const StampEdit = forwardRef(StampEditBase)
