'use client'
import React, { useState } from 'react'
import Link from 'next/link';
// import import useIsMounted from '../hooks/useIsMounted'

export default function SideBar() {
    // const isMounted = useIsMounted();
    const [ toggleCollapse, setToggleCollapse ] = useState(false);
  return (
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
            {/* <div className="relative mt-6">
                <ConnectKitButton />
            </div> */}
            <div>
                <span className='flex justify-end'>
                    <button className='hover:bg-gray-800 rounded-md bg-gray-600 text-white' onClick={() => setToggleCollapse(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </span>            
            </div>
            <div className="relative mt-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>

                <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search"/>
            </div>

                <hr className="my-6 border-gray-200 dark:border-gray-600" />
            </div>

    </div>

  )
}

