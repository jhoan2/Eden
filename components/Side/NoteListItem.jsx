import Link from "next/link"
import { useNoteStore } from "../store"

export default function NoteListItem({noteId, cid}) {
  const { user } = useNoteStore()
  
  if(!cid) return (
    <Link href={`/user/${user.id}/${noteId}`} key={noteId} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Title
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400 truncate">
      Some text that will need to be set some kind of limit upond
    </p>
  </Link>
  )

    // const { isLoading, isError, error, data } = useQuery({
    //     queryKey: ['noteById'],
    //     queryFn: async () => await fetch(`http://localhost:3000/api/notesById/?noteCid=${noteCid}&path=${}`, {method: "GET"})
    //       .then((res) => res.json())
    //       //returns {}
    //       .then((value) => setContent(value))
    //   })
    
    
    //   if (isLoading === 'fetching') {
    //     return <span>React Query Loading...</span>
    //   }
    
    //   if (isError) {
    //     return <span>Error: {error.message}</span>
    //   }

  return (
    <div>
      <Link className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Title of found note
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Some text
        </p>
      </Link>
    </div>
  )
}
