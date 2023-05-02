import React, { MouseEventHandler } from 'react'
import { ActionButton } from '../common/ActionButton'

export type TimerButtonProps = {
  onClick: MouseEventHandler
}

export const TimerButton: React.FC<TimerButtonProps> = ({ onClick }) => {
  return <ActionButton onClick={onClick} label="timer" bgColor="orange" />
}
