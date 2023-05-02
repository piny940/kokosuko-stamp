import { Position } from '../resources/types'
import { youtubeTimeToStampTime } from './timestamp'

export const DEFAULT_CHAT_HEIGHT = 460

export const getRelatedItemsEl = () => document.querySelector('#related')

export const getChatEl = () => document.querySelector('#chat')

export const getBelowPlayerEl = () => document.querySelector('#below')

export const getTopLeftEl = () => document.querySelector('#content')

export const getLiveStreamDetailEl = () => {
  const detailEls = document.querySelectorAll(
    'span.style-scope.yt-formatted-string.bold'
  )
  for (const detailEl of detailEls) {
    const text = detailEl.textContent || ''
    if (
      text[0] !== '#' &&
      (text.includes('配信') || text.includes('公開予定'))
    ) {
      return detailEl
    }
  }
  return null
}

export const getPlayerEl = () => document.querySelector('.html5-video-player')

export const isStreamingGoing = (): boolean => {
  if (!isLiveStream()) return false

  const detailEl = getLiveStreamDetailEl()
  return !detailEl?.textContent?.match(/(ライブ配信$)|(配信済み$)/)
}

export const getVideoId = () => {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get('v') || undefined
}

export const isLiveStream = () => {
  return !!getLiveStreamDetailEl()
}

export const isWatchPage = () => {
  return window.location.pathname == '/watch'
}

export const hasWatchPageLoaded = () => {
  return !!getRelatedItemsEl() && !!getBelowPlayerEl()
}

let prevUrl = window.location.href
export const hasUrlChanged = () => {
  const prev = prevUrl
  prevUrl = window.location.href
  return prev !== prevUrl
}

export const getPlayerTime = () => {
  const playerEl = getPlayerEl() as HTMLElement | null
  if (!playerEl) return undefined
  playerEl.click()

  const time = document.querySelector('.ytp-time-current')?.textContent
  playerEl.click()
  if (!time) return undefined
  return youtubeTimeToStampTime(time)
}

export const updateChatHeight = (height: number) => {
  const chatEl = getChatEl() as any
  if (!chatEl) return

  chatEl.style.setProperty('--ytd-watch-flexy-chat-max-height', `${height}px`)
}

export const getParent = (position: Position | 'topLeft') => {
  if (position === 'aboveItems') {
    return getChatEl() || getRelatedItemsEl()
  } else if (position === 'belowPlayer') {
    return getBelowPlayerEl()
  } else if (position === 'topLeft') {
    return getTopLeftEl()
  } else {
    return null
  }
}
