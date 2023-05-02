import React, { useRef, useState } from 'react'
import { Stamp } from '../resources/types'
import styled from 'styled-components'
import { DeleteButton } from '../components/timestamp/DeleteButton'
import { getVideoId } from '../lib/youtube'
import { LinkButton } from '../components/timestamp/LinkButton'
import { timeToSecond } from '../lib/utils'
import { StampEdit } from './StampEdit'

const TimeFieldSpan = styled.span`
  padding: 0.375rem 0.75rem;
`

const TextDiv = styled.div`
  flex: 1 1 auto;
  height: 27px;
  padding: 0.375rem 0.75rem;
  overflow: hidden;
`

export type ShowProps = {
  stamp: Stamp
  setEditingStamp: (stamp: Stamp | undefined) => void
  editingStamp: Stamp | undefined
  deleteStamp: () => void
  updateStamp: (stamp: Stamp) => void
}

export const StampRow: React.FC<ShowProps> = ({
  stamp,
  setEditingStamp,
  editingStamp,
  deleteStamp,
  updateStamp,
}) => {
  const inputRef = useRef<{
    time: () => HTMLInputElement | null
    text: () => HTMLInputElement | null
  }>(null)
  const timeSpanRef = useRef<HTMLSpanElement>(null)
  const textDivRef = useRef<HTMLDivElement>(null)
  const [editingField, setEditingField] = useState<'time' | 'text'>('text')

  const onTimeSpanClick = () => {
    setEditingField('time')
    // setに時間がかかるためかsetTimeoutにしないとうまく動かない
    setTimeout(() => {
      inputRef.current?.time()?.focus()
    })
  }
  const onTextDivClick = () => {
    setEditingField('text')
    // setに時間がかかるためかsetTimeoutにしないとうまく動かない
    setTimeout(() => {
      inputRef.current?.text()?.focus()
    })
  }

  return (
    <div className="d-flex w-100">
      <LinkButton
        href={`https://www.youtube.com/watch?v=${getVideoId()}&t=${timeToSecond(
          stamp.time
        )}s`}
      />
      {editingStamp?.id === stamp.id ? (
        <StampEdit
          ref={inputRef}
          initialStamp={stamp}
          updateStamp={updateStamp}
          editingField={editingField}
          setEditingField={setEditingField}
        />
      ) : (
        <div
          className="d-flex flex-grow-1"
          onClick={() => setEditingStamp(stamp)}
        >
          <TimeFieldSpan onClick={onTimeSpanClick} ref={timeSpanRef}>
            {stamp.time}
          </TimeFieldSpan>
          <TextDiv onClick={onTextDivClick} ref={textDivRef}>
            {stamp.text}
          </TextDiv>
        </div>
      )}
      <DeleteButton onClick={deleteStamp} />
    </div>
  )
}
