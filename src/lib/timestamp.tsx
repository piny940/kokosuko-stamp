import React from 'react'
import { createRoot } from 'react-dom/client'
import { TimestampApp } from '../containers/TimestampApp'
import { TIME_STAMP_ROOT_EL_ID } from '../resources/constants'
import { Position, Stamp } from '../resources/types'
import { shiftTime } from './utils'
import { getParent } from './youtube'

export const removeTimestampApp = () => {
  document
    .querySelectorAll(`#${TIME_STAMP_ROOT_EL_ID}`)
    .forEach((el) => el.remove())
}

export const createTimestampApp = (
  position: Position,
  positionFixed: boolean
) => {
  const parentEl = getParent(positionFixed ? position : 'topLeft')
  if (!parentEl) return

  // すでにrootElがある場合は一旦削除する
  removeTimestampApp()

  const rootEl = document.createElement('div')
  rootEl.setAttribute('id', TIME_STAMP_ROOT_EL_ID)
  parentEl.prepend(rootEl)
  const root = createRoot(rootEl)
  root.render(
    <TimestampApp position={position} positionFixed={positionFixed} />
  )
}

// ex) 00:02:30 => 2:30
export const stampTimeToYoutubeTime = (time: string) => {
  const hh = Number(time.slice(0, 2))
  const mm = Number(time.slice(3, 5))
  const hourText = hh === 0 ? '' : `${hh}:`
  const minText = hh === 0 ? `${mm}:` : time.slice(3, 6)
  return `${hourText}${minText}${time.slice(6)}`
}

// ex) 2:30 => 00:02:30
export const youtubeTimeToStampTime = (time: string) => {
  const times = time.split(':')
  const hh = times.length == 3 ? ('00' + times[0]).slice(-2) : '00'
  const mm = ('00' + times[times.length - 2]).slice(-2)
  const ss = times[times.length - 1]
  return `${hh}:${mm}:${ss}`
}

export const stampToText = (stamp: Stamp, format: string) => {
  const hh = Number(stamp.time.slice(0, 2))
  const mm = Number(stamp.time.slice(3, 5))
  const hourText = hh === 0 ? '' : `${hh}:`
  const minText = hh === 0 ? `${mm}:` : stamp.time.slice(3, 6)

  const timeText = `${hourText}${minText}${stamp.time.slice(6)}`
  return format.replaceAll('%t', timeText).replaceAll('%s', stamp.text)
}

export const isFormatValid = (format: string) => {
  return format.includes('%t') && format.includes('%s')
}

export const compareStamp = (
  stampA: Stamp | null | undefined,
  stampB: Stamp | null | undefined
) => {
  if (!stampA && !stampB) return 0
  if (!stampA) return 1
  if (!stampB) return -1
  if (stampA.time > stampB.time) return 1
  else if (stampA.time < stampB.time) return -1
  else return 0
}

export const updateStampTime = (stamp: Stamp, diff: number) => {
  return {
    ...stamp,
    time: shiftTime(stamp.time, diff),
  }
}

export const updateStampsTime = (stamps: Stamp[], diff: number) => {
  if (isNaN(diff)) return stamps

  const newStamps = stamps.slice()
  for (let i = 0; i < newStamps.length; i++) {
    const stamp = newStamps[i]
    newStamps[i] = updateStampTime(stamp, diff)
  }
  return newStamps
}
