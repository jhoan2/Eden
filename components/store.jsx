import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useNoteStore = create(
  immer((set) => ({
    noteTree: [],
    noteTreeChanged: false,
    smartAccountAddress: '',
    notes: {notes: new Map()},
    setNoteTreeChanged: () => set({noteTreeChanged: true}),
    addFolder: (folderObject) => set((state) => {state.noteTree.push(folderObject)}),
    addPage: (pageObject) => set((state) => {state.noteTree.push(pageObject)}),
    //Auth.js
    updateSmartAccount: (smartAccountAddress) => set({smartAccountAddress: smartAccountAddress})
    //when re-ordering, it needs to entirely reset the state. 
  }))
)