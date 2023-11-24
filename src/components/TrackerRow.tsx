import * as React from 'react'
import {diffTime} from '../helper'
import { Trackers } from '../type'

interface TrackersRow {
    tracker: Trackers,
    selectedId?: Trackers, 
    onSelected: React.Dispatch<React.SetStateAction<undefined | Trackers>>
}

const TrackerRow = ({tracker, selectedId, onSelected}: TrackersRow) => {
  const starttime = new Date(tracker?.starttime).toLocaleString()
  const endtime = tracker?.endtime
    ? new Date(tracker?.endtime).toLocaleString()
    : 'en cours ...'

  const [duration, setDuration] = React.useState(
    diffTime(tracker?.starttime, tracker?.endtime),
  )

  React.useEffect(() => {
    const refresh = () => {
      setDuration(diffTime(tracker?.starttime, tracker?.endtime))
    }
    const timerID = setTimeout(() => refresh(), 1000)
    return () => {
      clearTimeout(timerID)
    }
    
  }, [duration, tracker?.endtime, tracker?.starttime])

  const handleClick = () => {
    onSelected(tracker)
  }

  const selected = tracker.id === selectedId?.id ? 'selectedline' : '';
  return (
    <>
    {tracker?.display ? 
        <tr className={selected} onClick={handleClick}>
          <td>{tracker.name}</td>
          <td>{starttime}</td>
          <td>{endtime}</td>
          <td>{duration}</td>
        </tr>
    : null}
    </> 
  )
}

export {TrackerRow}
