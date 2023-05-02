import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { StampRow } from '../../containers/StampRow'
import { compareStamp } from '../../lib/timestamp'
import { Stamp } from '../../resources/types'
import { ExpandButton } from '../common/ExpandButton'

const StampsUl = styled.ul`
  max-height: 600px;
  overflow-y: auto;
`

export type StampsListProps = {
  stamps: Stamp[]
  editingStamp: Stamp | undefined
  setEditingStamp: (stamp: Stamp | undefined) => void
  updateStamps: (stamps: Stamp[]) => void
  sorted: boolean
  isExpanded: boolean
  toggleExpanded: () => void
  deleteStamp: (stamp: Stamp) => void
}

export const StampsList: React.FC<StampsListProps> = ({
  stamps,
  editingStamp,
  setEditingStamp,
  updateStamps,
  sorted,
  isExpanded,
  toggleExpanded,
  deleteStamp,
}) => {
  const [sortedStamps, setSortedStamps] = useState<Stamp[]>(stamps)
  const prevLength = useRef(stamps.length)

  const sortStamps = () => {
    setSortedStamps(
      sorted ? stamps.slice().sort(compareStamp) : stamps.slice().reverse()
    )
  }
  const updateStampsKeepingOrder = () => {
    const newStamps = sortedStamps.slice()
    for (let i = 0; i < newStamps.length; i++) {
      newStamps[i] =
        stamps.find((s) => s.id === newStamps[i].id) || newStamps[i]
    }
    setSortedStamps(newStamps)
  }

  useEffect(() => {
    if (stamps.length !== prevLength.current) {
      prevLength.current = stamps.length
      return
    }
    updateStampsKeepingOrder()
  }, [stamps])

  useEffect(() => {
    sortStamps()
  }, [stamps.length, sorted])

  const renderStamp = (stamp: Stamp) => {
    return (
      <StampRow
        stamp={stamp}
        editingStamp={editingStamp}
        setEditingStamp={setEditingStamp}
        deleteStamp={() => deleteStamp(stamp)}
        updateStamp={(updatedStamp) =>
          updateStamps(
            stamps.map((s) => (s.id === updatedStamp.id ? updatedStamp : s))
          )
        }
      />
    )
  }

  return (
    <div className="d-flex flex-column align-items-center w-100">
      {isExpanded ? (
        <StampsUl className="list-unstyled mb-0 w-100 p-0">
          {sortedStamps.map((stamp) => (
            <li className="w-100" key={stamp.id}>
              {renderStamp(stamp)}
            </li>
          ))}
        </StampsUl>
      ) : (
        sortedStamps.length > 0 && renderStamp(sortedStamps[0])
      )}
      <ExpandButton isExpanded={isExpanded} onClick={toggleExpanded} />
    </div>
  )
}
