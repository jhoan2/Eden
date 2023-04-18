'use client'
import Link from "next/link"
import { useNoteStore } from "../store"
import { useQuery } from 'react-query'

export default function NoteListItem({noteId, cid}) {
  const { user } = useNoteStore()
  const {cid: noteCid, title} = cid
  let firstParagraph = ''
  if(!noteId) return

  const { isLoading, isError, error, data } = useQuery({
      queryKey: ['noteById'],
      queryFn: async () => await fetch(`http://localhost:3000/api/notesById/?noteCid=${noteCid}`, {method: "GET"})
      .then((res) => res.json())
  })
  if (isLoading === 'fetching') {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (data && data.value.content.content[1]) {
    firstParagraph = data.value.content.content[1].content[0].text
  }
  
  return (
    <div>
      { cid ?
          <Link href={`/user/${user.id}/${noteId}`} key={noteId} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {firstParagraph}
            </p>
          </Link>
          :
          <Link href={`/user/${user.id}/${noteId}`} key={noteId} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Untitled
            </h5>
          </Link>
      }
    </div>
  )
}
