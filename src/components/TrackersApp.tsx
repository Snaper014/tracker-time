import * as React from 'react'
import { FilterTrackers } from './FilterTrackers'
import {TrackersTable} from './TrackersTable'
import {TrackerEditForm} from './TrackerEditForm'
import { Trackers } from '../type'
import db from '../data'

function TrackersApp() {
  const [allTrackers, setAllTrackers] = React.useState(db)
  const [selectedTracker, setSelectedTracker] = React.useState<Trackers | undefined>();
  const storage = localStorage.getItem('Trackers');

  const user = typeof storage === null ? null : 
            JSON.parse(localStorage.getItem('Trackers') as string)
  const fenetre = window.closed;


  if(fenetre){
    if(user){
      setAllTrackers(user)
    }
  } 
    window.addEventListener('load', () => {
      if(user){
        setAllTrackers(user)
      }else return;
    })

  React.useEffect(() => {
    localStorage.setItem('Trackers', JSON.stringify(allTrackers))
    }, [allTrackers])

  const handleTextChange = (text: string) => {
    let updatedList = allTrackers.map(track => {
          if(text === ""){
            return {...track, display: true};
          }
          else if(track.name.toLowerCase().indexOf(text) !== -1){
              return {...track, display: true};
          }else{
            return {...track, display: false};
          }
    })
    setAllTrackers(updatedList);
  }

  const handleAddTracker = (tracker: Trackers) => {
    if (tracker.id === '') {
      alert('il manque le tracker id')
      return
    }
    if (tracker.name === '') {
      alert('veuillez renseigner le nom du tracker')
      return
    }
    if (tracker.starttime === '') {
      alert('veuillez renseigner la date de début')
      return
    }
    if (tracker.category === '') {
      alert('veuillez renseigner la categorie')
      return
    }
    setAllTrackers([...allTrackers, tracker])
    
  }
  const handleDeleteTracker = (tracker: Trackers) => {
    if (tracker.id === '') {
      alert('il manque le tracker id')
      return
    }
    setAllTrackers(allTrackers.filter(item => item.id !== tracker.id))
  }
  const handleUpdateTracker = (tracker: Trackers) => {
    if (tracker.id === '') {
      alert('il manque le tracker id')
      return
    }
    if (tracker.name === '') {
      alert('veuillez renseigner le nom du tracker')
      return
    }
    if (tracker.starttime === '') {
      alert('veuillez renseigner la date de début')
      return
    }
    if (tracker.category === '') {
      alert('veuillez renseigner la categorie')
      return
    }

    let updatedList = allTrackers.map(item =>
      item.id === tracker.id ? tracker : item,
    )
    setAllTrackers(updatedList)
  }

  return (
    <>
      <FilterTrackers onTextChange={handleTextChange} />
      <TrackerEditForm
        selectedTracker={selectedTracker}
        onAddTracker={handleAddTracker}
        onUpdateTracker={handleUpdateTracker}
        onDeleteTracker={handleDeleteTracker}
      />
      <TrackersTable
        trackers={allTrackers}
        selectedTracker={selectedTracker}
        onSelectedTracker={setSelectedTracker}
      />
    </>
  )
}
export {TrackersApp};
