import React, { useEffect, useRef, useState } from 'react'
import { copyToClipboard, getLast, shiftTime } from '../lib/utils'
import { TextField } from '../components/common/TextField'
import {
  Position,
  Settings,
  SettingsForm as SettingsFormType,
  Stamp,
  Transform,
} from '../resources/types'
import { useDelayedRequest, useId } from '../lib/hooks'
import {
  getOffsetFromStorage,
  getSettingsFromStorage,
  getStampsFromStorage,
  getTransformFromStorage,
  setOffsetToStorage,
  setSettingsToStorage,
  setStampsToStorage,
  setTransformToStorage,
} from '../lib/storage'
import {
  DEFAULT_CHAT_HEIGHT,
  getPlayerTime,
  isStreamingGoing,
  updateChatHeight,
} from '../lib/youtube'
import { StampsList } from '../components/timestamp/StampsList'
import { CopyButton } from '../components/timestamp/CopyButton'
import {
  compareStamp,
  createTimestampApp,
  isFormatValid,
  stampToText,
} from '../lib/timestamp'
import { AddButton } from '../components/timestamp/AddButton'
import { SortButton } from '../components/timestamp/SortButton'
import { SettingsForm } from '../components/timestamp/SettingsForm'
import { OffsetForm } from '../components/timestamp/OffsetForm'
import { AppWrapper } from '../components/timestamp/AppWrapper'
import { updateStampsTime as updateStampsTimeApi } from '../lib/timestamp'

export const DEFAULT_FORMAT = '%t %s'
export const DEFAULT_POSITION: Position = 'belowPlayer'
export const DEFAULT_POSITION_FIXED = true
const DEFAULT_WIDTH = 376
const DEFAULT_HEIGHT = 'auto'
const DEFAULT_TRANSFORM = {
  size: {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  position: {
    x: 0,
    y: 0,
  },
}

export type TimestampAppProps = {
  position: Position
  positionFixed: boolean
}

export const TimestampApp: React.FC<TimestampAppProps> = (props) => {
  const [editingStamp, setEditingStamp] = useState<Stamp | undefined>()
  const [listExpanded, setListExpanded] = useState<boolean>(!isStreamingGoing())
  const [sorted, setSorted] = useState(!isStreamingGoing())
  const [offsetMessage, setOffsetMessage] = useState('')
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM)
  const [newStampText, setNewStampText] = useState('')
  const [offset, setOffset] = useState('0')
  const [stamps, setStamps] = useState<Stamp[]>([])
  const [settings, setSettings] = useState<SettingsFormType>({
    offset: '0',
    chatHeight: DEFAULT_CHAT_HEIGHT,
    format: DEFAULT_FORMAT,
    positionFixed: props.positionFixed,
    position: props.position,
  })
  const prevOffset = useRef(0)
  const { createNewId, updateNewId } = useId()

  // Stamps
  const createNewStamp = async () => {
    const id = createNewId()
    const playTime = getPlayerTime() || '00:00:00'
    const time = shiftTime(playTime, Number(offset) || 0)
    const newStamps = [
      ...stamps,
      {
        id: id,
        text: newStampText,
        time: time,
      },
    ]

    setStamps(newStamps)
    setStampsToStorage(newStamps)
    setNewStampText('')
    if (sorted) setListExpanded(true)
  }

  const deleteStamp = (stamp: Stamp) => {
    const newStamps = stamps.filter((s) => s.id !== stamp.id)
    setStamps(newStamps)
    setStampsToStorage(newStamps)
  }

  const initializeStamps = async () => {
    const stamps = await getStampsFromStorage()
    setStamps(stamps)

    if (stamps.length === 0) return
    const last = getLast(stamps)
    if (last) {
      updateNewId(last.id + 1)
    }
  }

  const copyStamps = async () => {
    const text = stamps
      .slice()
      .sort(compareStamp)
      .map((stamp) => stampToText(stamp, settings.format))
      .join('\n')
    await copyToClipboard(text)
  }

  // Offset
  const initializeOffset = async () => {
    const offset =
      (await getOffsetFromStorage()) || parseInt(settings.offset) || 0
    setOffset(offset.toString())
    setOffsetToStorage(offset)
    prevOffset.current = offset
  }

  const updateStampsTime = async ({ offset }: { offset: number }) => {
    if (isNaN(offset)) return

    const newStamps = updateStampsTimeApi(stamps, offset - prevOffset.current)
    prevOffset.current = offset
    setStamps(newStamps)
    setStampsToStorage(newStamps)
    setOffsetToStorage(offset)
  }

  // Settings
  const makeSettingsValid = (settings: SettingsFormType): Settings => {
    return {
      ...settings,
      offset: Number(settings.offset) || 0,
      chatHeight:
        settings.chatHeight < DEFAULT_CHAT_HEIGHT
          ? DEFAULT_CHAT_HEIGHT
          : settings.chatHeight,
      format: isFormatValid(settings.format) ? settings.format : DEFAULT_FORMAT,
    }
  }
  const updatePosition = ({
    position,
    positionFixed,
  }: {
    position?: Position
    positionFixed?: boolean
  }) => {
    createTimestampApp(
      position || settings.position,
      positionFixed || settings.positionFixed
    )
  }
  const initializeSettings = async () => {
    const storedSettings = await getSettingsFromStorage()
    let mergedSettings = settings

    if (!storedSettings) {
      setSettingsToStorage(makeSettingsValid(settings))
    } else {
      // 今のpositionがstorageのsettingsのpositionと合致していない場合はappを作り直す
      if (
        settings.positionFixed !== storedSettings.positionFixed ||
        settings.position !== storedSettings.position
      ) {
        createTimestampApp(
          storedSettings.position,
          storedSettings.positionFixed
        )
      }
      mergedSettings = {
        ...settings,
        ...storedSettings,
        offset: storedSettings.offset.toString() || settings.offset,
      }
      setSettings(mergedSettings)
      setSettingsToStorage(makeSettingsValid(mergedSettings))
    }
    updateChatHeight(mergedSettings.chatHeight)
  }
  const updateSettings = (updatedSettings: Partial<SettingsFormType>) => {
    setSettings({ ...settings, ...updatedSettings })
    setSettingsToStorage(makeSettingsValid({ ...settings, ...updatedSettings }))
  }

  // Transform
  const initializeTransform = async () => {
    const transform = await getTransformFromStorage()
    if (!transform) return
    setTransform(transform)
  }
  const updateTransform = async (transform: Transform) => {
    setTransform(transform)
    await setTransformToStorage(transform)
  }

  const { reserveRequest } = useDelayedRequest<{ offset: number }>({
    setMessage: setOffsetMessage,
    sendRequest: updateStampsTime,
  })

  useEffect(() => {
    initializeStamps()
    initializeSettings()
    initializeTransform()
  }, [])

  useEffect(() => {
    initializeOffset()
  }, [settings.offset])

  return (
    <AppWrapper
      transform={transform}
      onTransformChange={updateTransform}
      position={settings.position}
      positionFixed={settings.positionFixed}
    >
      <div className="d-flex align-items-center ps-3">
        <AddButton onClick={createNewStamp} />
        <CopyButton onClick={copyStamps} />
        <div className="ps-0 flex-fill">
          <TextField
            value={newStampText}
            onChange={(e) => setNewStampText(e.target.value)}
            placeholder="メモを入力"
          />
        </div>
        <SettingsForm
          onOffsetChange={(e) => updateSettings({ offset: e.target.value })}
          onFormatChange={(e) => updateSettings({ format: e.target.value })}
          onChatHeightSettingChange={(e) => {
            updateSettings({ chatHeight: parseInt(e.target.value) })
            updateChatHeight(parseInt(e.target.value))
          }}
          onPositionFixedChange={(e) => {
            updateTransform(DEFAULT_TRANSFORM)
            updateSettings({ positionFixed: e.target.checked })
            updatePosition({ positionFixed: e.target.checked })
          }}
          onPositionChange={(e) => {
            updateSettings({ position: e.target.value as Position })
            updatePosition({ position: e.target.value as Position })
          }}
          settings={settings}
        />
        <SortButton onClick={() => setSorted(!sorted)} sorted={sorted} />
      </div>
      <OffsetForm
        offset={offset}
        onOffsetChange={(e) => {
          setOffset(e.target.value)
          reserveRequest({ offset: parseInt(e.target.value) || 0 })
        }}
        message={offsetMessage}
      />
      <StampsList
        sorted={sorted}
        stamps={stamps}
        setEditingStamp={setEditingStamp}
        editingStamp={editingStamp}
        isExpanded={listExpanded}
        toggleExpanded={() => setListExpanded(!listExpanded)}
        deleteStamp={deleteStamp}
        updateStamps={(stamps) => {
          setStamps(stamps)
          setStampsToStorage(stamps)
        }}
      />
    </AppWrapper>
  )
}
