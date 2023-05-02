import React from 'react'
import { MouseEventHandler } from 'react'
import { ActionButton } from '../common/ActionButton'

export type SortButtonProps = {
  onClick: MouseEventHandler
  sorted: boolean
}

export const SortButton: React.FC<SortButtonProps> = ({ onClick, sorted }) => {
  const baseColor = '#E8D100'
  const colorStyle = sorted
    ? {
        bgColor: baseColor,
      }
    : {
        bgColor: 'transparent',
        textColor: baseColor,
        borderColor: baseColor,
      }

  return <ActionButton onClick={onClick} label="sort" {...colorStyle} />
}
