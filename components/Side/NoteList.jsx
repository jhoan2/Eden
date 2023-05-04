'use client'
import React, { useState } from 'react';
import { useNoteStore } from '../store';
import { v4 as uuidv4 } from 'uuid';
import NoteListItem from './NoteListItem';
import DeleteNoteListItem from './DeleteNoteListItem';
import { useQueries } from 'react-query';
import LoadingSpinner from '../LoadingSpinner';
// import import useIsMounted from '../hooks/useIsMounted'

export default function NoteList({toggleNoteList, setToggleNoteList, setContent}) {
    const { currentFolder, addNewNote, noteTree } = useNoteStore();
    const [ deleteView, setDeleteView ] = useState(false)
    const [ loading, setLoading ] = useState(false);
    // const isMounted = useIsMounted();
    function getNotesForFolder(noteTree, folderId) {
        let notes = [];
      
        for (let i = 0; i < noteTree?.length; i++) {
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

    const fetchNoteById = async (noteCid, noteId) => {
        setLoading(true)
        if(!noteCid) return {noteId: noteId}
        const response =  await fetch(`http://localhost:3000/api/notesById/?noteCid=${noteCid}`, {method: "GET"})
        if(!response.ok) {
            throw new Error('Could not retrieve notes')
        }
        let dataResponse = await response.json()
        dataResponse.noteId = noteId
        dataResponse.noteCid = noteCid
        return dataResponse
    }

    const noteQueries = useQueries(
        notes.map((note) => {
          return {
            queryKey: ['noteById', note.id],
            queryFn: () => fetchNoteById(note.cid.cid, note.id),
          }
        }),
      )

    const addNote = () => {
        const noteId = uuidv4();
        const noteObject = {"folderId": currentFolder.id, "noteId": noteId, cid: ""}
        addNewNote(noteObject)
    }

    if(noteQueries[noteQueries.length - 1]?.isFetching) {
        return <LoadingSpinner />
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
                {noteQueries ? 
                    <div>
                        {deleteView ?
                            <div className='flex-col p-2 content-end overflow-y-auto space-y-2'>
                                <p className='text-xl font-bold dark:text-white'>Folder: {currentFolder.value}</p>
                                <div className='flex justify-end w-full'>
                                    <button onClick={() => setDeleteView(false)} className='inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path d="M6.53451 3H20.9993C21.5516 3 21.9993 3.44772 21.9993 4V20C21.9993 20.5523 21.5516 21 20.9993 21H6.53451C6.20015 21 5.88792 20.8329 5.70246 20.5547L0.369122 12.5547C0.145189 12.2188 0.145189 11.7812 0.369122 11.4453L5.70246 3.4453C5.88792 3.1671 6.20015 3 6.53451 3ZM7.06969 5L2.40302 12L7.06969 19H19.9993V5H7.06969ZM12.9993 10.5858L15.8277 7.75736L17.242 9.17157L14.4135 12L17.242 14.8284L15.8277 16.2426L12.9993 13.4142L10.1709 16.2426L8.75668 14.8284L11.5851 12L8.75668 9.17157L10.1709 7.75736L12.9993 10.5858Z" fill="#000"></path>
                                        </svg>
                                    </button>
                                </div>
                                {noteQueries?.map((note) => {
                                    return <DeleteNoteListItem key={note.data?.noteId} noteId={note.data?.noteId} cid={note.noteCid} data={note.data} />
                                })} 
                            </div>
                            :
                            <div className='flex-col content-end p-2 overflow-y-auto space-y-2'>
                                <p className='text-xl font-bold dark:text-white'>Folder: {currentFolder.value}</p>
                                <div className='flex justify-between'>
                                    <button onClick={() => addNote()} className='inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                                        New Note
                                    </button>
                                    <button onClick={() => setDeleteView(true)} className='inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path d="M15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM16 11V13H8V11H16Z" fill="#000"></path>
                                        </svg>
                                    </button>
                                </div>
                                {noteQueries?.map((note) => {
                                    return <NoteListItem key={note.data?.noteId} data={note.data} setContent={setContent} />
                                })}
                            </div>
                        }
                    </div>
                     :
                    <p className='text-xl font-bold dark:text-white'>Folder: </p>
                }
            </div>
        </div>
    </div>  
    )
}


