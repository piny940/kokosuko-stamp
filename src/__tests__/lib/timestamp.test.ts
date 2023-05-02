import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import {
  compareStamp,
  stampTimeToYoutubeTime,
  stampToText,
  updateStampsTime,
  youtubeTimeToStampTime,
} from '../../lib/timestamp'
import { Stamp } from '../../resources/types'

describe('stampTimeToYoutubeTime', () => {
  it('hhが1桁の場合に正常に処理できる', () => {
    const time = '02:30:40'
    expect(stampTimeToYoutubeTime(time)).toBe('2:30:40')
  })
  it('hhが00でmmが2桁の場合に正常に処理ができる', () => {
    const time = '00:31:20'
    expect(stampTimeToYoutubeTime(time)).toBe('31:20')
  })
  it('hhが00でmmが1桁の場合に正常に処理ができる', () => {
    const time = '00:02:10'
    expect(stampTimeToYoutubeTime(time)).toBe('2:10')
  })
})

describe('youtubeTimeToStampTime', () => {
  it('hhが1桁の場合に正常に処理できる', () => {
    const time = '2:30:40'
    expect(youtubeTimeToStampTime(time)).toBe('02:30:40')
  })
  it('hhが00でmmが2桁の場合に正常に処理ができる', () => {
    const time = '31:20'
    expect(youtubeTimeToStampTime(time)).toBe('00:31:20')
  })
  it('hhが00でmmが1桁の場合に正常に処理ができる', () => {
    const time = '2:10'
    expect(youtubeTimeToStampTime(time)).toBe('00:02:10')
  })
})

describe('stampToText', () => {
  it('正常にstampをtextに変換できる', () => {
    const stamp = Mock.from<Stamp>({
      time: '00:02:30',
      text: 'テスト',
    })
    expect(stampToText(stamp, '%t %s')).toBe('2:30 テスト')
  })
})

describe('updateStampsTime', () => {
  it('正常にstampsの時間をずらすことができる', () => {
    const stamps = [Mock.from<Stamp>({ time: '02:00:05' })]
    expect(updateStampsTime(stamps, -10)).toEqual([
      Mock.from<Stamp>({ time: '01:59:55' }),
    ])
    expect(stamps).toEqual([Mock.from<Stamp>({ time: '02:00:05' })])
  })
})

describe('compareStamp', () => {
  it('正常にstampをtimeで比較できる', () => {
    const stampA = Mock.from<Stamp>({
      time: '02:12:30',
    })
    const stampB = Mock.from<Stamp>({
      time: '02:13:30',
    })
    expect(compareStamp(stampA, stampB)).toBeLessThan(0)
  })
  it('一方がundefinedの場合はundefinedが後ろに来る', () => {
    const stampA = Mock.from<Stamp>({
      time: '02:12:30',
    })
    const stampB = undefined
    expect(compareStamp(stampA, stampB)).toBeLessThan(0)
    expect(compareStamp(stampB, stampA)).toBeGreaterThan(0)
  })
  it('両方がundefinedの場合は0を返す', () => {
    expect(compareStamp(undefined, undefined)).toBe(0)
  })
})
