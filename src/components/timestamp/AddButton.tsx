import React from 'react'
import { MouseEventHandler } from 'react'
import { ActionButton } from '../common/ActionButton'

export type AddButtonProps = {
  onClick: MouseEventHandler
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return <ActionButton onClick={onClick} label="add" bgColor="#4EC747" />
}
