import { Settings, Stamp, Transform } from '../resources/types'
import { getVideoId } from './youtube'

export const toStorage = async (key: string, value: any) => {
  await chrome.storage.local.set({ [key]: value })
}

export const fromStorage = async (keys: string[]) => {
  return await chrome.storage.local.get(keys)
}

export const getStampsStorageKey = () => `videos.${getVideoId()}.stamps`
export const getStampsFromStorage = async () => {
  const key = getStampsStorageKey()

  const storage = await fromStorage([key])
  if (!storage || !storage[key]) return []

  return storage[key] as Stamp[]
}
export const setStampsToStorage = async (stamps: Stamp[]) => {
  await toStorage(getStampsStorageKey(), stamps)
}

export const getOffsetStorageKey = () => `videos.${getVideoId()}.offset`
export const getOffsetFromStorage = async () => {
  const key = getOffsetStorageKey()

  const storage = await fromStorage([key])
  if (!storage || storage[key] == null) return undefined

  return storage[key] as number
}
export const setOffsetToStorage = async (offset: number) => {
  await toStorage(getOffsetStorageKey(), offset)
}

export const getSettingsFromStorage = async () => {
  const storage = await fromStorage(['settings'])
  if (!storage || storage['settings'] == null) return undefined

  return storage['settings'] as Settings
}
export const setSettingsToStorage = async (settings: Settings) => {
  await toStorage('settings', settings)
}

export const getTransformFromStorage = async () => {
  const storage = await fromStorage(['transform'])
  if (!storage || storage['transform'] == null) return undefined

  return storage['transform'] as Transform
}
export const setTransformToStorage = async (transform: Transform) => {
  await toStorage('transform', transform)
}
