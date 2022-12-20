'use client'
import React, { createContext } from 'react'
import { useImmerReducer } from "use-immer";

const allNotes = new Map()

const initialState = {
  changedNotes: [],
}

function AppReducer( draft, action ) {
  const { type, payload } = action; 
  switch(type) {
      case "ADD_TO_CHANGED_NOTES":
          return void draft.changedNotes.push(payload.changedNotes)

          //After Adding 
          //[{id: '', changedNotes: JSON}]
      case "UPDATE_CHANGED_NOTES":
          return void draft.changedNotes.map(note => (note.id === payload.changedNotes.id) ? note.changedNotes = payload.changedNotes.changedNotes : null)

      default: 
          throw new Error(`No case for type ${type} found`)
  }
}

export const AppContext = createContext(initialState);
 
export default function AppProvider({children}) {
  const [state, dispatch] = useImmerReducer(AppReducer, initialState)
    
  const addToChangedNotes = (note) => {
    dispatch({
      type: "ADD_TO_CHANGED_NOTES",
      payload: {
        changedNotes: note,
      }
    })
  }

  const updateChangedNotes = (note) => {
    dispatch({
      type: "UPDATE_CHANGED_NOTES",
      payload: {
        changedNotes: note,
      }
    })
  }

  const value = {
    addToChangedNotes,
    updateChangedNotes,
    changedNotes: state.changedNotes,
    allNotes: allNotes
  }

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

