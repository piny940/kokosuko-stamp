import React, { CSSProperties, ReactNode } from 'react'
import { getTheme, isPositionOnPage } from '../../lib/utils'
import { TIMESTAMP_APP_EL_ID } from '../../resources/constants'
import { Rnd } from 'react-rnd'
import { getChatEl } from '../../lib/youtube'
import { Position, Transform } from '../../resources/types'

export type AppWrapperProps = {
  children: ReactNode
  position: Position
  positionFixed: boolean
  transform: Transform
  onTransformChange: (transform: Transform) => void
}

export const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  position,
  positionFixed,
  transform,
  onTransformChange,
}) => {
  const getBorderRadius = (): CSSProperties => {
    let topLeft,
      topRight,
      bottomLeft,
      bottomRight = '0px'

    if (getChatEl() && position === 'aboveItems') topLeft = topRight = '12px'
    else topLeft = topRight = bottomLeft = bottomRight = '0.5rem'

    return {
      borderTopLeftRadius: topLeft,
      borderTopRightRadius: topRight,
      borderBottomLeftRadius: bottomLeft,
      borderBottomRightRadius: bottomRight,
    }
  }

  const className = () => {
    if (position === 'aboveItems') {
      if (getChatEl()) return getTheme() === 'light' ? 'border-bottom ' : ''
      else return 'border mb-4 '
    } else if (position === 'belowPlayer') {
      return 'border mb-4 mt-5 '
    }
  }

  return positionFixed ? (
    <div
      data-bs-theme={getTheme()}
      id={TIMESTAMP_APP_EL_ID}
      className={
        'text-body bg-body py-3 px-4 pb-0 z-index-3000 ' +
        className() +
        TIMESTAMP_APP_EL_ID
      }
      style={{
        ...getBorderRadius(),
      }}
    >
      {children}
    </div>
  ) : (
    <Rnd
      className="z-index-3000"
      minWidth={258}
      minHeight={100}
      size={transform.size}
      position={transform.position}
      onDragStop={(e, d) => {
        e = e as MouseEvent
        if (!isPositionOnPage(e.clientX, e.clientY)) return
        onTransformChange({ ...transform, position: d })
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        e = e as MouseEvent
        if (!isPositionOnPage(e.clientX, e.clientY)) return
        onTransformChange({
          size: { width: ref.style.width, height: ref.style.height },
          position: position,
        })
      }}
    >
      <div
        data-bs-theme={getTheme()}
        id={TIMESTAMP_APP_EL_ID}
        className={
          'text-body bg-body py-3 px-4 pb-0 w-100 h-100 overflow-auto border border-2 rounded-3 ' +
          TIMESTAMP_APP_EL_ID
        }
      >
        {children}
      </div>
    </Rnd>
  )
}
