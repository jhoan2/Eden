'use client'
import React, { createContext } from 'react'
import { useImmerReducer } from "use-immer";



const initialState = {
  changedNotes: [],
  allNotes: new Map()
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
// const formatJSON = (json) => {
//   //[{type, content: []}]
//   const id = json.content[0].attrs.id
//   const title = json.content[0].content[0].text
//   const note = { 
//     id: id, 
//     title: title,
//     content: json,
//   }
//   //[{id: , title: , content: json, created_at, updated_at}]
//   return note 
// }
// I could just call this here so I don't have to do this everytime. just map through and apply this function to each one.  in the state. 
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
    allNotes: state.allNotes
  }

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

