import { TIMESTAMP_APP_EL_ID } from '../resources/constants'

export const insertMioLink = () => {
  const mioLink = document.createElement('link')
  mioLink.rel = 'stylesheet'
  mioLink.href =
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
  document.querySelector('head')?.appendChild(mioLink)
}

export const getTheme = (): 'light' | 'dark' => {
  return document.querySelector('html')?.getAttribute('dark') === null
    ? 'light'
    : 'dark'
}

export const toJsonDate = (date: Date) => {
  const yyyy = date.getFullYear()
  const mm = ('0' + (date.getMonth() + 1)).slice(-2)
  const dd = ('0' + date.getDate()).slice(-2)
  return `${yyyy}-${mm}-${dd}`
}

export const toJsonTime = (date: Date) => {
  const hh = ('0' + date.getHours()).slice(-2)
  const mm = ('0' + date.getMinutes()).slice(-2)
  const ss = ('0' + date.getSeconds()).slice(-2)
  return `${hh}:${mm}:${ss}`
}

export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text)
}

export function removeUndefined<T>(array: Array<T | null | undefined>) {
  return array.filter((v) => v != null) as Array<T>
}

export function getLast<T>(array: Array<T>) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i]) return array[i]
  }
  return undefined
}

export const timeToSecond = (time: string) => {
  if (!time.match(/\d{2}:\d{2}:\d{2}/)) {
    throw new Error()
  }
  const h = parseInt(time.slice(0, 2))
  const m = parseInt(time.slice(3, 5))
  const s = parseInt(time.slice(6))
  return h * 3600 + m * 60 + s
}

export const shiftTime = (time: string, diff: number) => {
  if (isNaN(diff)) return time

  const shiftedTime = new Date(`2000-01-01T${time}.000Z`)
  shiftedTime.setTime(shiftedTime.getTime() + diff * 1000)
  return shiftedTime.toJSON().slice(11, 19)
}

export const isPositionOnPage = (x: number, y: number) => {
  return x >= 0 && y >= 0
}

export const getCSSProperty = (varName: string) => {
  const el = document.querySelector('#' + TIMESTAMP_APP_EL_ID)
  if (!el) return undefined
  const style = getComputedStyle(el)
  return String(style.getPropertyValue(varName))
}

export const getBodyTextColor = () => getCSSProperty('--bs-body-color')

export const getBorderColor = () => getCSSProperty('--bs-border-color')
