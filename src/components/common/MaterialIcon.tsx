import React, { CSSProperties } from 'react'

export type MaterialIconProps = {
  name: string
  className?: string
  style?: CSSProperties
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  className,
  style,
}) => {
  return (
    <span className={className + ' material-symbols-outlined'} style={style}>
      {name}
    </span>
  )
}
