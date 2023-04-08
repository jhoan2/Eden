'use client'
import React, { useState } from 'react'
import Editor from "../../../../components/Editor"
import { useQuery } from "react-query"

export default function NoteById({params} ) {
  const { noteId, cid } = params
  const [ results, setResults ] = useState([])
  if(!cid) {
    return <Editor noteId={noteId} data={results} />
  }

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['noteById'],
    queryFn: async () => await fetch(`http://localhost:3000/api/notesById/?noteCid=${cid}`, {method: "GET"})
      .then((res) => res.json())
      //returns {}
      .then((value) => setResults(value))
  })
  console.log(data)
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="shadow-md">
      {/* {content ? 
        <Editor content={content} /> :
        <p>Loading...</p>
      } */}
    </div>

  )
}
