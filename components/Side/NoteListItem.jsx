'use client'

export default function NoteListItem({data, setContent}) {
  
  const { noteId } = data

  return (
    <div>
      { data?.value ?
      // data.value = {id, title, value: { id, content, title} }
          <button className="text-left text-ellipsis overflow-hidden max-h-52 w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={() => setContent(data.value)}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.value?.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {data ? data.value.content.content[1]?.content[0].text : null}
            </p>
          </button>
          :
          <button className="text-left text-ellipsis overflow-hidden max-h-52 w-full max-w-sm p-6  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={() => setContent({id: noteId, title: 'Untitled..', content: '<h1>Untitled..</h1>'})}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Untitled
            </h5>
          </button>
      }
    </div>
  )
}

