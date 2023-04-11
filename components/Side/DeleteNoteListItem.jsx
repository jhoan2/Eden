import React, { useState } from 'react'
import { useNoteStore } from '../store'
export default function DeleteNoteList({noteId, cid}) {
    const { deleteNoteById, setNoteTreeChanged, addToDeleteNotes } = useNoteStore();
    const [ confirmDelete, setConfirmDelete ] = useState(false)
    const deleteNoteInFolder = () => {
        deleteNoteById({id: noteId})
        //if the note has a cid, then that should mean that it came from the user's table 
        if(cid) {
            setNoteTreeChanged(true)
            addToDeleteNotes(noteId)
        } 
    }
    
  return (
    <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Title
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 truncate">
            Some text that will need to be set some kind of limit upond
        </p>
        {confirmDelete ? 
            <button onClick={() => setConfirmDelete(true)} className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800'>
                Delete
            </button> 
            :
            <button onClick={() => deleteNoteInFolder()} className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800'>
                Confirm
            </button>
        }
        
    </div>

  )
}
