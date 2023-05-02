import React, { ChangeEventHandler } from 'react'
import { getBodyTextColor } from '../../lib/utils'
import { DEFAULT_CHAT_HEIGHT } from '../../lib/youtube'
import {
  Position,
  positions,
  SettingsForm as SettingsFormType,
} from '../../resources/types'
import { Dropdown } from '../common/Dropdown'
import { NumberField } from '../common/NumberField'
import { SelectField } from '../common/SelectField'
import { SwitchField } from '../common/SwitchField'
import { TextField } from '../common/TextField'
import { SettingsField } from './SettingsField'

export type SettingsFormProps = {
  onOffsetChange: ChangeEventHandler<HTMLInputElement>
  onFormatChange: ChangeEventHandler<HTMLInputElement>
  onChatHeightSettingChange: ChangeEventHandler<HTMLInputElement>
  onPositionChange: ChangeEventHandler<HTMLSelectElement>
  onPositionFixedChange: ChangeEventHandler<HTMLInputElement>
  settings: SettingsFormType
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  onOffsetChange,
  onFormatChange,
  onChatHeightSettingChange,
  onPositionChange,
  onPositionFixedChange,
  settings,
}) => {
  return (
    <Dropdown
      togglerLabel="settings"
      togglerBgColor="transparent"
      togglerTextColor={getBodyTextColor()}
      togglerSize={28}
      togglerOptions={{
        'data-bs-auto-close': 'outside',
      }}
      dropdownWidth="300px"
      dropdownClassName="px-3 py-4"
    >
      <h3>タイムスタンプ設定</h3>
      <SettingsField
        title="オフセット(既定値)"
        description="例)-4の場合 2:30:10 → 2:30:06"
      >
        <NumberField
          value={settings.offset.toString()}
          onChange={onOffsetChange}
          className="border-0"
        />
      </SettingsField>
      <SettingsField
        title="フォーマット"
        description="例)[%t] %s → [1:03:20] メモ"
      >
        <TextField
          value={settings.format}
          onChange={onFormatChange}
          placeholder="%t %s"
        />
      </SettingsField>
      <SettingsField
        title="チャット欄の高さ"
        description={`${DEFAULT_CHAT_HEIGHT}以上のみ可(デフォルト値: ${DEFAULT_CHAT_HEIGHT})`}
      >
        <NumberField
          value={settings.chatHeight.toString()}
          onChange={onChatHeightSettingChange}
          placeholder={DEFAULT_CHAT_HEIGHT.toString()}
        />
      </SettingsField>
      <SettingsField title="位置を固定">
        <SwitchField
          checked={settings.positionFixed}
          onChange={onPositionFixedChange}
        />
        {settings.positionFixed && (
          <SettingsField title="位置">
            <SelectField value={settings.position} onChange={onPositionChange}>
              {Object.keys(positions).map((pos) => (
                <option value={pos} key={pos}>
                  {positions[pos as Position]}
                </option>
              ))}
            </SelectField>
          </SettingsField>
        )}
      </SettingsField>
    </Dropdown>
  )
}
