'use client'
import React, { useState} from 'react'
import SideBarCommit from './SideBarCommit'
import SideBarFolders from './SideBarFolders';
import SearchBar from './SearchBar';
import AddFolder from './AddFolder';
import DeleteFolder from './DeleteFolder';


// import import useIsMounted from '../hooks/useIsMounted'

export default function SideBar({sideBarView, setToggleNoteList}) {
    // const isMounted = useIsMounted();
    const [ toggleCollapse, setToggleCollapse ] = useState(false);
    const [ deleteFolders, setDeleteFolders ] = useState(false)
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
                            {deleteFolders ? 
                                <div className='flex w-full justify-end px-3'>
                                    <button onClick={() => setDeleteFolders(false)} className='inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path d="M6.53451 3H20.9993C21.5516 3 21.9993 3.44772 21.9993 4V20C21.9993 20.5523 21.5516 21 20.9993 21H6.53451C6.20015 21 5.88792 20.8329 5.70246 20.5547L0.369122 12.5547C0.145189 12.2188 0.145189 11.7812 0.369122 11.4453L5.70246 3.4453C5.88792 3.1671 6.20015 3 6.53451 3ZM7.06969 5L2.40302 12L7.06969 19H19.9993V5H7.06969ZM12.9993 10.5858L15.8277 7.75736L17.242 9.17157L14.4135 12L17.242 14.8284L15.8277 16.2426L12.9993 13.4142L10.1709 16.2426L8.75668 14.8284L11.5851 12L8.75668 9.17157L10.1709 7.75736L12.9993 10.5858Z" fill="#000"></path>
                                        </svg>
                                    </button>
                                </div>
                                 :
                                <div className='flex justify-between w-full pt-2'>
                                    <AddFolder />
                                    <DeleteFolder setDeleteFolders={setDeleteFolders} />
                                </div>
                            }
                            
                        </div>
                    </>
                     : <p className='text-xl font-bold dark:text-white'>Commit </p>
                    }
                    
                    <hr className="my-6 border-gray-200 dark:border-gray-600" />
                    <div className='p-2'>
                        {sideBarView ? (<SideBarFolders setToggleNoteList={setToggleNoteList} deleteFolders={deleteFolders} />) : <SideBarCommit  />}
                    </div>
                </div>
            </div>
        </div>
    </div>  
    )
}

