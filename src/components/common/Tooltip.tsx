import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useDelayedAction } from '../../lib/hooks'

const TooltipDiv = styled.div`
  .tooltip-text {
    margin: 0 auto;
    position: absolute;
    padding: 3px 3px;
    border-radius: 7px;
    text-align: center;
    bottom: -70px;
    z-index: 10000;
    flex-shrink: 0;
  }
  .tooltip-arrow {
    position: absolute;
    content: '';
    bottom: -45px;
    left: calc(50% - 8px);
    border-bottom-width: 7px;
    border-bottom-style: solid;
    border-bottom: 7px rgb(13, 110, 253) solid;
    border-left: 8px transparent solid;
    border-right: 8px transparent solid;
    border-top: 0px transparent solid;
    z-index: 10000;
  }
`

export type TooltipProps = {
  type: 'onClick' | 'onHover'
  duration?: number
  testID?: string
  bgColor?: string
  color?: string
  width: string
  text: string
  children: ReactNode
  onShown?: () => void
  onHidden?: () => void
}

export const Tooltip: React.FC<TooltipProps> = ({
  type,
  duration = 2,
  text,
  bgColor = 'black',
  color = 'white',
  width,
  children,
  testID,
  onShown = () => undefined,
  onHidden = () => undefined,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [isShown, setIsShown] = useState(false)
  const { reserve: reserveHide } = useDelayedAction(() => {
    setIsShown(false)
    onHidden()
  }, duration)

  useEffect(() => {
    if (!tooltipRef.current) return

    if (!children || Array.isArray(children.valueOf())) {
      throw new Error("Tooltip's children must be one element.")
    }

    const targetEl = tooltipRef.current.nextElementSibling

    if (!targetEl) return

    if (type == 'onHover') {
      targetEl.addEventListener('mouseenter', () => {
        setIsShown(true)
        onShown()
      })
      targetEl.addEventListener('mouseleave', () => {
        setIsShown(false)
        onHidden()
      })
    } else {
      targetEl.addEventListener('click', () => {
        setIsShown(true)
        onShown()
        reserveHide()
      })
    }
  }, [])

  return (
    <div className="d-flex flex-column">
      <TooltipDiv
        ref={tooltipRef}
        role="tooltip"
        data-testid={testID}
        className="position-relative d-flex flex-column align-items-center"
      >
        {isShown ? (
          <>
            <div
              className="tooltip-text"
              style={{ width: width, backgroundColor: bgColor, color: color }}
            >
              {text}
            </div>
            <span
              className="tooltip-arrow"
              style={{ borderBottomColor: bgColor }}
            ></span>
          </>
        ) : (
          <></>
        )}
      </TooltipDiv>
      {children}
    </div>
  )
}
