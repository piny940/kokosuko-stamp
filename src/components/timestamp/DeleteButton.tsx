import React from 'react'
import { MouseEventHandler } from 'react'
import { getBodyTextColor } from '../../lib/utils'
import { ActionButton } from '../common/ActionButton'

export type DeleteButtonProps = {
  onClick: MouseEventHandler
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <ActionButton
      onClick={onClick}
      label="delete"
      bgColor="transparent"
      size={27}
      textColor={getBodyTextColor()}
    />
  )
}
