import { getBodyTextColor } from '../../lib/utils'
import React from 'react'
import { ActionButton } from '../common/ActionButton'

export type LinkButtonProps = {
  href: string
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href }) => {
  return (
    <ActionButton
      label="share"
      bgColor="transparent"
      textColor={getBodyTextColor()}
      size={27}
      href={href}
    />
  )
}
