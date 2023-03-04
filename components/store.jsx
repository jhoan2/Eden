import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useNoteStore = create(
  immer((set) => ({
    noteTree: [],
    noteTreeChanged: false,
    smartAccountAddress: '',
    notes: {notes: new Map()},
    userTableName: '',
    devTableID: 0,
    setNoteTreeChanged: () => set({noteTreeChanged: true}),
    addFolder: (folderObject) => set((state) => {state.noteTree.push(folderObject)}),
    addPage: (pageObject) => set((state) => {state.noteTree.push(pageObject)}),
    //Auth.js
    updateSmartAccount: (smartAccountAddress) => set({smartAccountAddress: smartAccountAddress}),
    //CreateTableButton.jsx
    updateUserTableName: (userTableName) => set({userTableName: userTableName}),
    //app/page.jsx
    updateDevTableID: (devTableID) => set({devTableID: devTableID}),
    //when re-ordering, it needs to entirely reset the state. 
  }))
)