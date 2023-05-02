import React, { forwardRef, MouseEventHandler } from 'react'
import { MaterialIcon } from './MaterialIcon'

export type ActionButtonProps = {
  onClick?: MouseEventHandler
  label: string
  bgColor: string
  textColor?: string
  borderColor?: string
  size?: number
  options?: any
  href?: string
}

const ActionButtonBase = (
  {
    onClick,
    bgColor,
    label,
    textColor,
    borderColor,
    size,
    options,
    href,
  }: ActionButtonProps,
  ref: any
) => {
  const style = {
    width: `${size || 32}px`,
    height: `${size || 32}px`,
    backgroundColor: bgColor,
    color: textColor || 'white',
    border: `solid 2px ${borderColor || bgColor}`,
  }

  return (
    <a
      role="button"
      href={href}
      className={
        'p-2 d-inline-block position-relative rounded m-1 flex-grow-0 flex-shrink-0 ' +
        options?.className
      }
      style={style}
      onClick={onClick}
      ref={ref}
      {...options}
    >
      <MaterialIcon
        name={label}
        className="position-absolute"
        style={{ left: '2px', top: '2px', fontSize: `${(size || 32) - 8}px` }}
      />
    </a>
  )
}

export const ActionButton = forwardRef(ActionButtonBase)
