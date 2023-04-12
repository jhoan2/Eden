'use client'
import React, { useState} from 'react'
import SideBarCommit from './SideBarCommit'
import SideBarFolders from './SideBarFolders';
import SearchBar from './SearchBar';
import AddFolder from './AddFolder';
import AddPage from './AddPage';


// import import useIsMounted from '../hooks/useIsMounted'

export default function SideBar({sideBarView, setToggleNoteList}) {
    // const isMounted = useIsMounted();
    const [ toggleCollapse, setToggleCollapse ] = useState(false);

    return (
     <div>
        <div>
            <div className='pl-2 pt-2'>
                {toggleCollapse ? 
                    <button className= 'hover:bg-gray-800 rounded-md bg-gray-600 text-white' onClick={() => {setToggleCollapse(false)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button> : null}
            </div>
            <div className={`${toggleCollapse ? 'w-0 collapse' : 'w-64'} flex flex-col h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600 `}>
                <div>
                    <span className='flex justify-end'>
                        <button className='hover:bg-gray-800 rounded-md bg-gray-600 text-white' onClick={() => setToggleCollapse(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </span>            
                </div>
                <div className='flex-col content-end overflow-y-auto'>
                    {sideBarView ?
                    <>
                        <div className="relative mt-6">
                            <SearchBar />
                        </div>
                        <div className='flex justify-between pt-2'>
                            <AddFolder />
                            {/* <AddPage /> */}
                        </div>
                    </>
                     : <p className='text-xl font-bold dark:text-white'>Commit </p>
                    }
                    
                    <hr className="my-6 border-gray-200 dark:border-gray-600" />
                    <div className='p-2'>
                        {sideBarView ? (<SideBarFolders setToggleNoteList={setToggleNoteList} />) : <SideBarCommit  />}
                    </div>
                </div>
            </div>
        </div>
    </div>  
    )
}

