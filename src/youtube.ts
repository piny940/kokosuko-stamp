import { hasUrlChanged, hasWatchPageLoaded, isWatchPage } from './lib/youtube'
import { createTimestampApp, removeTimestampApp } from './lib/timestamp'
import {
  DEFAULT_POSITION,
  DEFAULT_POSITION_FIXED,
} from './containers/TimestampApp'

const TRY_TIMES = 5
const TRY_INTERVAL = 1000
const onWatchPage = () => {
  let tryCount = 0
  const id = setInterval(() => {
    if (hasWatchPageLoaded()) {
      createTimestampApp(DEFAULT_POSITION, DEFAULT_POSITION_FIXED)

      clearInterval(id)
      return
    }

    tryCount++
    if (tryCount > TRY_TIMES) {
      clearInterval(id)
    }
  }, TRY_INTERVAL)
}

export const onYoutube = () => {
  if (isWatchPage()) {
    onWatchPage()
  }

  // 画面遷移時にコンポーネントが再生成されるようにする
  const headEl = document.querySelector('head')
  if (!headEl) return

  const observer = new MutationObserver(() => {
    if (hasUrlChanged()) {
      removeTimestampApp()

      if (isWatchPage()) {
        onWatchPage()
      }
    }
  })
  observer.observe(headEl, { childList: true })
}
