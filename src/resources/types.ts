export const positions = {
  aboveItems: '関連動画上',
  belowPlayer: '動画画面下',
}
export type Position = keyof typeof positions

export type Stamp = {
  id: number
  time: string // hh:mm:ss
  text: string
}

export type Settings = {
  offset: number
  chatHeight: number
  format: string
  positionFixed: boolean
  position: Position
}

export type SettingsForm = {
  offset: string
  chatHeight: number
  format: string
  positionFixed: boolean
  position: Position
}

export type Transform = {
  size: {
    width: number | string
    height: number | string
  }
  position: {
    x: number
    y: number
  }
}
