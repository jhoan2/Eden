import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { enableMapSet } from 'immer';
import produce from 'immer';
enableMapSet();

export const useNoteStore = create(
  immer((set) => ({
    noteTree: [],
    noteTreeChanged: false,
    smartAccountAddress: '',
    user: {},
    insertNotes: new Map(),
    updateNotes: new Map(),
    deleteNotes: [],
    addToDeleteNotes: (id) => set((state) => {state.deleteNotes.push(id)}),
    setNoteTreeChanged: () => set({noteTreeChanged: true}),
    addFolder: (folderObject) => set((state) => {state.noteTree.push(folderObject)}),
    addPage: (pageObject) => set((state) => {state.noteTree.push(pageObject)}),
    //Auth.js
    updateSmartAccount: (smartAccountAddress) => set({smartAccountAddress: smartAccountAddress}),
    //CreateTableButton.jsx
    updateUserTableName: (userTableName) => set({userTableName: userTableName}),
    //app/page.jsx
    updateDevTableID: (devTableID) => set({devTableID: devTableID}),
    updateUser: (user) => set({user: user}),
    //when re-ordering, it needs to entirely reset the state. 
    //NoteList.jsx and SideBarFolders
    currentFolder: {},
    updateCurrentFolder: (currentFolderObject) => set({currentFolder: currentFolderObject}),
    addNewNote: ({folderId, noteId, cid}) => set(produce((state) => {
      const noteToAdd = {id: noteId, cid: cid};
      const findNodeById = (node) => {
        if (node.id === folderId) {
          node.notes.push(noteToAdd);
        } else {
          if (node.children) {
            node.children.forEach(findNodeById);
          }
          if (node.notes) {
            node.notes.forEach(findNodeById);
          }
        }
      };
      state.noteTree.forEach(findNodeById);
    })),
    deleteFolderById: (folderId) => set(produce((state) => {
      const findAndRemoveNodeById = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.id === folderId) {
            nodes.splice(i, 1);
            return true; 
          } else {
            if (node.children) {
              const foundAndRemoved = findAndRemoveNodeById(node.children);
              if (foundAndRemoved) return true; 
            }
          }
        }
        return false; 
      };
      findAndRemoveNodeById(state.noteTree);
    })),
    updateNoteInFolder: ({id, cid}) => set(produce((state) => {
      const note = {id: id, cid: cid};
      const findAndRemoveNodeById = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.id === id || !node.id) {
            nodes.splice(i, 1);
            nodes.unshift(note);
            return true; 
          } else {
            if (node.children) {
              const foundAndRemoved = findAndRemoveNodeById(node.children);
              if (foundAndRemoved) return true; 
            }
            if (node.notes) {
              const foundAndRemoved = findAndRemoveNodeById(node.notes);
              if (foundAndRemoved) return true; 
            }
          }
        }
        return false; 
      };
      findAndRemoveNodeById(state.noteTree);
    })),
    deleteNoteById: ({id}) => set(produce((state) => {
      const findAndRemoveNodeById = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.id === id) {
            nodes.splice(i, 1);
            return true; 
          } else {
            if (node.children) {
              const foundAndRemoved = findAndRemoveNodeById(node.children);
              if (foundAndRemoved) return true; 
            }
            if (node.notes) {
              const foundAndRemoved = findAndRemoveNodeById(node.notes);
              if (foundAndRemoved) return true; 
            }
          }
        }
        return false; 
      };
      findAndRemoveNodeById(state.noteTree);
      })
    ),
    }))
)