import { useRef, useState } from 'react'

export const useId = (initialId = 0) => {
  const newIdRef = useRef(initialId)

  const createNewId = () => {
    const current = newIdRef.current
    newIdRef.current++
    return current
  }

  const updateNewId = (updatedNewId: number) => {
    newIdRef.current = updatedNewId
  }
  return { createNewId, updateNewId }
}

export const useDelayedAction = <T = void>(
  callback: (arg: T) => Promise<void> | void,
  delay: number
) => {
  const timeoutId = useRef<NodeJS.Timeout>()

  const reserve = (arg: T) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
    timeoutId.current = setTimeout(async () => {
      await callback(arg)
    }, delay)
  }
  return { reserve }
}

export const useDelayedRequest = <T = any>({
  sendRequest,
  setMessage,
  message = '正常に保存されました',
}: {
  sendRequest: (newData: T) => Promise<void>
  setMessage?: (message: string) => void
  message?: string
}) => {
  const [updatedData, setUpdatedData] = useState<T>()
  const { reserve: reserveMessageDeletion } = useDelayedAction(() => {
    if (!setMessage) return
    setMessage('')
  }, 3000)
  const { reserve: _reserveRequest } = useDelayedAction<T>(
    async (newData: T) => {
      await sendRequest(newData)
      if (!setMessage) return
      setMessage(message)
      reserveMessageDeletion()
    },
    1000
  )

  const reserveRequest = (newData: T) => {
    const data = { ...updatedData, ...newData }

    setUpdatedData(data)
    _reserveRequest(data)
  }
  return { reserveRequest }
}
