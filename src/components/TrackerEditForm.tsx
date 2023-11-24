import * as React from 'react'
import { GeneratorID } from '../helper'
import {getDateTimeForPicker} from '../helper'
import { Trackers } from '../type'


type STATE = {
    status: string,
    tracker: Trackers,
    activeButtons: {
        btnSave: boolean;
        btnUp: boolean;
        btnDel: boolean;
    },
    activeInput: boolean,
  }

type ACTIONTYPE = {
    type: string,
    payload?: Trackers,
}
const newTracker = () => ({
    id: GeneratorID(),
    category: 'Défault',
    starttime: getDateTimeForPicker(),
    endtime: '',
    name: '',
    display: true,
  })

const InitialState: STATE = {
    tracker: {...newTracker(), id: ''},
    status: 'idle',
    activeInput: false,
    activeButtons: {btnSave: false, btnUp: false, btnDel: false},
  }

const reducer =  (state: STATE , action: ACTIONTYPE): STATE => {
  switch (action.type) {
    case 'new':
      return {
        status: 'new',
        tracker: action.payload!,
        activeButtons: {btnSave: true, btnUp: false, btnDel: false},
        activeInput: true,
      }
    case 'edit':
      return {
        status: 'edition',
        tracker: action.payload!,
        activeButtons: {btnSave: false, btnUp: true, btnDel: true},
        activeInput: true,
      }
    case 'save':
      return {
        ...state,
        status: 'saved',
        activeButtons: {btnSave: false, btnUp: false, btnDel: false},
        activeInput: false,
      }
    case 'update':
      return {
        ...state,
        status: 'updated',
        activeButtons: {btnSave: false, btnUp: true, btnDel: true},
        activeInput: true,
      }
    case 'delete':
      return {
        ...state,
        status: 'deleted',
        tracker: action.payload!,
        activeButtons: {btnSave: false, btnUp: false, btnDel: false},
        activeInput: false,
      }
    case 'trackerChange':
      return {
        ...state,
        tracker: action.payload!,
      }
    default:
      throw new Error('Action non supporté')
  }
}


const TrackerEditForm = ({
  selectedTracker = {...newTracker(), id: ''},
  onAddTracker,
  onDeleteTracker,
  onUpdateTracker,
}: {
    selectedTracker?: Trackers,
    onAddTracker: (tracker: Trackers) => void,
    onDeleteTracker: (tracker: Trackers) => void,
    onUpdateTracker: (tracker: Trackers) => void,
}) => {
 
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const handleTrackerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'trackerChange',
      payload: {...state.tracker, name: e.target.value},
    })
  }

  const handleTrackerStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'trackerChange',
      payload: {...state.tracker, starttime: e.target.value},
    })
  }

  const handleTrackerEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'trackerChange',
      payload: {...state.tracker, endtime: e.target.value},
    })
  }

  const handleTrackerCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'trackerChange',
      payload: {...state.tracker, category: e.target.value},
    })
  }

  React.useEffect(() => {
    if (selectedTracker?.id !== '') {
      dispatch({type: 'edit', payload: selectedTracker})
    }
  }, [selectedTracker])

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAddTracker(state.tracker)
    dispatch({type: 'save'})
  }

  const handleUpdateTracker = () => {
    onUpdateTracker(state.tracker)
    dispatch({type: 'update'})
  }

  const handleDeleteTracker = () => {
    onDeleteTracker(state.tracker)
    dispatch({type: 'delete', payload: newTracker()})
  }

  const handleNewTracker = () => {
    dispatch({type: 'new', payload: newTracker()})
  }

  return (
    <>
      <form className="Form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Gestion des Trackers</legend>
          <label htmlFor="trackerName">Nom du tracker :</label>
          <input
            disabled={!state.activeInput}
            type="text"
            id="trackerName"
            placeholder="tracker name..."
            onChange={handleTrackerName}
            value={state.tracker.name}
          ></input>

          <label htmlFor="trackerDateStart">Date de début :</label>
          <input
            disabled={!state.activeInput}
            id="trackerDateStart"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerStartTime}
            value={state.tracker.starttime}
            step="2"
          ></input>

          <label htmlFor="trackerDateEnd">Date de fin :</label>

          <input
            disabled={!state.activeInput}
            id="trackerDateEnd"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerEndTime}
            value={state.tracker.endtime}
            step="2"
          ></input>

          <label>
            Categorie:
            <select
              disabled={!state.activeInput}
              value={state.tracker.category}
              onChange={handleTrackerCategory}
            >
              <option value="Default">Default</option>
              <option value="Sport">Sport</option>
              <option value="Code">Code</option>
              <option value="Perso">Perso</option>
            </select>
          </label>

          <label>Actions</label>
          <div className="Action">
            <input
              className="button-action"
              type="button"
              value="Nouveau Tracker"
              onClick={handleNewTracker}
            ></input>
            <input
              disabled={!state.activeButtons.btnSave}
              className="button-action"
              type="submit"
              value="Ajouter"
            ></input>
            <input
              disabled={!state.activeButtons.btnDel}
              className="button-action"
              type="button"
              value="Supprimer"
              onClick={handleDeleteTracker}
            ></input>
            <input
              disabled={!state.activeButtons.btnUp}
              type="button"
              value="Mettre à jour"
              onClick={handleUpdateTracker}
            ></input>
          </div>
        </fieldset>
      </form>
    </>
  )
}

export {TrackerEditForm}
