import { expect } from '@jest/globals'
import React from 'react'
import { render } from '@testing-library/react'
import { TestComponent } from '../utils/mock'
import { SettingsField } from '../../components/timestamp/SettingsField'
import { TestID } from '../../resources/testId'

describe('<SettingsField />', () => {
  it('正常に描画される', () => {
    const { getByText, getByTestId } = render(
      <SettingsField title="テストタイトル" description="テスト説明">
        <TestComponent testID={TestID.TEST} />
      </SettingsField>
    )

    expect(getByText('テストタイトル')).toBeTruthy()
    expect(getByText('テスト説明')).toBeTruthy()
    expect(getByTestId(TestID.TEST)).toBeTruthy()
  })
})
