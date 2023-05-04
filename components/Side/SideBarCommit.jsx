'use client'
import React, { useState } from 'react'
import { useNoteStore } from '../store'
import Link from "next/link"
import { Database } from "@tableland/sdk";
import { useRouter } from 'next/navigation';

export default function SideBarCommit() {
  const { noteTreeChanged, insertNotes, updateNotes, user, noteTree, deleteNotes } = useNoteStore();
  const [ committing, setCommitting ] = useState(false)
  const db = new Database();
  let insertNotesArray = Array.from(insertNotes)
  let updateNotesArray = Array.from(updateNotes)
  const noteTreeObject = {userId: user.id, noteTree: noteTree}
  const router = useRouter()

  const commitNotes = async () => {
    setCommitting(true)
    let arr = []
    if(updateNotesArray.length > 0) {
      updateNotesArray.map((note) => {
        arr.push(db.prepare(`UPDATE ${user.owned_table} SET content=?1, updated_at=BLOCK_NUM() WHERE id=?2`).bind(note[1].cid, note[0]))
      })
    }
    if(insertNotesArray.length > 0)  {
      insertNotesArray.map((note) => {
        arr.push(db.prepare(`INSERT INTO ${user.owned_table} (id, content, created_at, updated_at) VALUES (?1, ?2, BLOCK_NUM(), BLOCK_NUM())`).bind(note[0], note[1].cid))
      })
    }
    if(deleteNotes.length > 0) {
      deleteNotes.map((note) => {
        arr.push(db.prepare(`DELETE FROM ${user.owned_table} WHERE id=?1`).bind(note))
      })
    }
    if(arr.length === 0) {
      const data = await fetch(`http://localhost:3000/api/noteTree`, {
        method: "POST",
        body: JSON.stringify(noteTreeObject)
      })
      if(data.status === 200) {
        useNoteStore.setState((state) => ({
          noteTreeChanged: false
        }))
      } else {
        console.log('error: Could note update the note tree!')
      }
    }
    if (arr.length > 0) {
      const [data, dbResponse] = await Promise.all([
        await fetch(`http://localhost:3000/api/noteTree`, {
          method: "POST",
          body: JSON.stringify(noteTreeObject)
        }),
        await db.batch(arr)
      ])
      if(data.status === 200) {
        useNoteStore.setState((state) => ({
          noteTreeChanged: false
        }))
      } else {
        console.log('error: Could note update the note tree!')
      }
      if(dbResponse[0].success) {
        useNoteStore.setState((state) => ({
          insertNotes: new Map(),
          updateNotes: new Map(),
          deleteNotes: []
        }))
        router.refresh()
      } else {
        console.log('error: Could not commit notes!')
      }
    }
    setCommitting(false)
  }

  return (
    <div>
      {(noteTreeChanged || updateNotesArray.length > 0 || insertNotesArray.length > 0) ? 
      <div>
        {committing ? 
          <button className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg>
            Committing ...
          </button> :
          <button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100' onClick={() => commitNotes()}>
          Commit
        </button>
        }
      </div> :
      null}
      <ul className='space-y-3'>
        { insertNotesArray ?
        insertNotesArray.map((note) => {
          return   ( <Link href={`/user/${user.id}/${note[0]}`} className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:text-emerald-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
          <p className="mb-2 truncate text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {note[1].title}
          </p>
        </Link>)
        }) :
        null
        }
        { updateNotesArray ?
        updateNotesArray.map((note) => {
          return   ( <Link href={`/user/${user.id}/${note[0]}`} className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:text-emerald-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
          <p className="mb-2 truncate text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {note[1].title}
          </p>
        </Link>)
        }) :
        null
        }
        { deleteNotes ?
        deleteNotes.map((note) => {
          return   ( <div className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:text-emerald-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
          <p className="mb-2 truncate text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Deleted Note
          </p>
        </div>)
        }) :
        null
        }
      </ul>
    </div>

  )
}
