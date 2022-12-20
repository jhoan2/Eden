'use client'
import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from './AppProvider';
import SideBarChanges from './SideBarChanges';
import SideBarFolders from './SideBarFolders';
import SearchBar from './SearchBar';
import { connect } from "@tableland/sdk";

// import import useIsMounted from '../hooks/useIsMounted'
const tableland = connect({ chain: "local-tableland" })

const formatJSON = (json) => {
  //[{changedNotes: {type: content: Array}, id: ''}]
  const id = json.content[0].attrs.id
  const title = json.content[0].content[0].text
  const note = { 
    id: id, 
    title: title,
    content: json,
  }
  //[{id: , title: , content: json, created_at, updated_at}]
  return note 
}

const publishNotes = async (notes) => {
    //notes is in array so map through and apply formatJSON to it. 
    console.log(notes)
    // const {name} = await tableland.create(`id int, title text, content text, created_at text, updated_at text`);
    //_31337_2 
    // await tableland.write()
}

export default function SideBar({sideBarView, setSideBarView}) {
    const {allNotes, changedNotes} = useContext(AppContext)
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
                <div>
                    <div className="relative mt-6">
                        {sideBarView ? 
                            <SearchBar />
                            : <button onClick={() => {publishNotes(changedNotes)}}>publish</button>
                        }        
                    </div>
                    <hr className="my-6 border-gray-200 dark:border-gray-600" />
                    <div>
                        {sideBarView ? (<SideBarFolders />) : <SideBarChanges allNotes={allNotes} />}
                    </div>
                </div>
            </div>
        </div>
    </div>  
    )
}

