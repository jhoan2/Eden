'use client'
import React from 'react'
import { useNoteStore } from '../store'
import { v4 as uuidv4 } from 'uuid';
import NoteListItem from './NoteListItem';
// import import useIsMounted from '../hooks/useIsMounted'

export default function NoteList({toggleNoteList, setToggleNoteList}) {
    const { currentFolder, addNewNote, noteTree } = useNoteStore();
    // const isMounted = useIsMounted();
    
    function getNotesForFolder(noteTree, folderId) {
        let notes = [];
      
        for (let i = 0; i < noteTree.length; i++) {
          const node = noteTree[i];
      
          if (node.id === folderId) {
            notes = node.notes;
          } else if (node.children && node.children.length > 0) {
            notes = getNotesForFolder(node.children, folderId);
          }
          
          if (notes.length > 0) {
            break;
          }
        }
        return notes;
    }

    const notes = getNotesForFolder(noteTree, currentFolder.id);

    const addNote = () => {
        const noteId = uuidv4();
        const noteObject = {"folderId": currentFolder.id, "noteId": noteId, cid: ""}
        addNewNote(noteObject)
    }
    
    return (
     <div>
        <div>
            <div className='pl-2 pt-2'>
                {toggleNoteList ? 
                    <button className= 'hover:bg-gray-800 rounded-md bg-gray-600 text-white' onClick={() => {setToggleNoteList(false)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button> : null}
            </div>
            <div className={`${toggleNoteList ? 'w-0 collapse' : 'w-64'} flex flex-col h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600 `}>
                <div>
                    <span className='flex justify-end'>
                        <button className='hover:bg-gray-800 rounded-md bg-gray-600 text-white' onClick={() => setToggleNoteList(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </span>            
                </div>
                {currentFolder.id ? 
                    <div className='flex-col content-end overflow-y-auto space-y-2'>
                        <p className='text-xl font-bold dark:text-white'>Folder: {currentFolder.value}</p>
                        <button onClick={() => addNote()} className='inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                            New Note
                        </button>
                        {notes?.map((note) => {
                            return <NoteListItem noteId={note.id} cid={note.cid} />
                        })}
                    </div> :
                    <p className='text-xl font-bold dark:text-white'>Folder: </p>
                }
            </div>
        </div>
    </div>  
    )
}


