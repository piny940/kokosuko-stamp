import React from 'react'
import { MouseEventHandler } from 'react'
import { getBodyTextColor } from '../../lib/utils'
import { ActionButton } from './ActionButton'

export type ExpandButtonProps = {
  onClick: MouseEventHandler
  isExpanded: boolean
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  onClick,
  isExpanded,
}) => {
  const label = isExpanded ? 'expand_less' : 'expand_more'
  return (
    <ActionButton
      onClick={onClick}
      bgColor="transparent"
      textColor={getBodyTextColor()}
      label={label}
      size={28}
    />
  )
}
