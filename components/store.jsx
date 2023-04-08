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
  //   addNewNote: ({folderId, noteId, cid}) => set(((state) => {
  //     const noteToAdd = {id: noteId, cid: cid};
  //     const findNodeById = (node) => {
  //       if (node.id === folderId) {
  //         node.notes.push(noteToAdd);
  //       } else {
  //         if (node.children) {
  //           node.children.forEach(findNodeById);
  //         }
  //         if (node.notes) {
  //           node.notes.forEach(findNodeById);
  //         }
  //       }
  //     };
  //     state.noteTree.forEach(findNodeById);
  //   })
  // ),
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
    })
  ),
upsertNote: (note) => {
  set((state) => {
    if (state.notes[note.id]) {
      state.notes[note.id] = { ...state.notes[note.id], ...note };
    } else {
      const existingNote = Object.values(state.notes).find((n) =>
        caseInsensitiveStringEqual(n.title, note.title)
      );
      if (existingNote) {
        // Update existing note
        state.notes[existingNote.id] = {
          ...state.notes[existingNote.id],
          ...note,
        };
      } else {
        // Insert new note
        state.notes[note.id] = note;
        insertTreeItem(
          state.noteTree,
          { id: note.id, children: [], collapsed: true },
          null
        );
      }
    }
  });
},
  }))
)

const insertTreeItem = (tree, item, targetId) => {
  if (targetId === null) {
    tree.push(item);
    return true;
  }

  for (let i = 0; i < tree.length; i++) {
    const treeItem = tree[i];
    if (treeItem.id === targetId) {
      tree[i].children.push(item);
      return true;
    } else if (treeItem.children.length > 0) {
      const result = insertTreeItem(treeItem.children, item, targetId);
      if (result) {
        return result;
      }
    }
  }
  return false;
};
