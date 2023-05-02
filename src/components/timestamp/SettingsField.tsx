import React from 'react'
import { ReactNode } from 'react'
import styled from 'styled-components'

const SettingsH4 = styled.h4`
  display: list-item;

  ::marker {
    content: '・';
    color: var(--bs-heading-color);
  }
`

export type SettingsFieldProps = {
  title: string
  description?: string
  children: ReactNode
}

export const SettingsField: React.FC<SettingsFieldProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <label className="my-2 w-100 px-4 my-3">
      <SettingsH4 className="">{title}</SettingsH4>
      <div className="w-100 d-flex flex-column">
        {description && <span className="mb-1">{description}</span>}
        {children}
      </div>
    </label>
  )
}
