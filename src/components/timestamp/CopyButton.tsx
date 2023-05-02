import React, { useEffect, useRef, useState } from 'react'
import { MouseEventHandler } from 'react'
import { useDelayedAction } from '../../lib/hooks'
import { getTheme } from '../../lib/utils'
import { ActionButton } from '../common/ActionButton'
import { Tooltip } from '../common/Tooltip'

export type CopyButtonProps = {
  onClick: MouseEventHandler
}

const DURATION = 1500
const DEFAULT_ICON = 'content_copy'
const COPIED_ICON = 'check_circle'
const BG_COLOR = '#2B6BFF'
export const CopyButton: React.FC<CopyButtonProps> = ({ onClick }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [buttonState, setButtonState] = useState<'ready' | 'copied'>('ready')
  const { reserve } = useDelayedAction(() => setButtonState('ready'), DURATION)

  useEffect(() => {
    buttonRef.current?.addEventListener('click', () => {
      setButtonState('copied')
      reserve()
    })
  })

  return (
    <Tooltip
      type="onClick"
      bgColor={getTheme() == 'dark' ? '#7c8086' : 'black'}
      duration={DURATION}
      width="57px"
      text="copied!"
    >
      <ActionButton
        onClick={onClick}
        label={buttonState == 'ready' ? DEFAULT_ICON : COPIED_ICON}
        bgColor={BG_COLOR}
        ref={buttonRef}
      />
    </Tooltip>
  )
}
