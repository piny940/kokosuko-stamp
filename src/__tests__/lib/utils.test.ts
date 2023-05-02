import {
  getLast,
  removeUndefined,
  timeToSecond,
  toJsonDate,
  toJsonTime,
} from '../../lib/utils'
import { expect } from '@jest/globals'

describe('toJsonDate', () => {
  it('Dateを正常にYYYY-MM-DDに変換できる', () => {
    const date = new Date(2022, 0, 1, 1, 1, 1)
    const dateString = toJsonDate(date)

    expect(dateString).toBe('2022-01-01')
  })
})
describe('toJsonTime', () => {
  it('Dateを正常にhh:mm:ssに変換できる', () => {
    const date = new Date(2022, 0, 1, 1, 1, 1)
    const timeString = toJsonTime(date)

    expect(timeString).toBe('01:01:01')
  })
})
describe('removeUndefined', () => {
  it('正常にundefinedおよびnullを配列から除去できる', () => {
    const arr = [1, '1', undefined, null]
    expect(removeUndefined(arr)).toEqual([1, '1'])
  })
})
describe('getLast', () => {
  it('正常に配列からundefined/nullを除く最後の値を取り出せる', () => {
    const arr = [1, '1', undefined, null]
    expect(getLast(arr)).toBe('1')
  })
})
describe('timeToSecond', () => {
  it('hh:mm:ssのかたちのtimeを秒数に変換できる', () => {
    const time = '03:12:13'
    expect(timeToSecond(time)).toBe(11533)
  })
  it('適切な型出ない場合はエラーが生じるようにする', () => {
    expect(() => {
      timeToSecond('12:13')
    }).toThrowError()
  })
})
