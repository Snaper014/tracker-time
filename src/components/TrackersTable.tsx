import './Trackers.css'
import {groupBy} from '../helper'
import {TrackerCategory} from './TrackerCategory'
import {TrackerRow} from './TrackerRow'
import { Trackers } from '../type'


interface TrackersTable {
    trackers: Trackers[],
    selectedTracker?: Trackers, 
    onSelectedTracker: React.Dispatch<React.SetStateAction<undefined | Trackers>>
}

const TrackersTable = ({trackers, selectedTracker, onSelectedTracker}: TrackersTable) => {
  const rows: any[] = []
  let lastCategory = ''

  const trackersParCategory = groupBy(trackers, 'category')

  Object.keys(trackersParCategory).forEach(category => {
    const EmptyCategory = trackersParCategory[category].every(items => items.display === false);
    if(EmptyCategory){
      return null;
    }
    trackersParCategory[category].forEach(tracker => {
      if (tracker.category !== lastCategory) {
        rows.push(
          <TrackerCategory
            key={category}
            category={tracker.category}
          ></TrackerCategory>,
        )
      }
      rows.push(
        <TrackerRow
          key={tracker.id}
          tracker={tracker}
          selectedId={selectedTracker}
          onSelected={onSelectedTracker}
        ></TrackerRow>,
      )
      lastCategory = tracker.category
    })
  })

  return (
    <>
      <h2 id="Title">Liste des trackers</h2>
      <div className="TableContainer">
        <table>
          <thead>
            <tr>
              <th>Nom du Tracker</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  )
}

export {TrackersTable}
