

export default function DeleteFolder({setDeleteFolders}) {
  return (
    <div  title='Delete Folder' className='flex justify-center w-6 rounded-md border border-gray-300 bg-white  py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100 ' onClick={() => setDeleteFolders(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM8 12H16V14H8V12Z"></path>
        </svg>
    </div>
  )
}
