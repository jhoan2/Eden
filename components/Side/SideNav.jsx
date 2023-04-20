'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import SideBar from './SideBar'
import NoteList from './NoteList'
import { useNoteStore } from '../store'
import Editor from '../Editor'
import { Avatar } from 'connectkit'

export default function SideNav() {
  const [sideBarView, setSideBarView] = useState(true);
  const [ toggleNoteList, setToggleNoteList ] = useState(true);
  const { noteTreeChanged, smartAccountAddress } = useNoteStore();
  const [ content, setContent ] = useState('')

  return (
    <div className='flex'>
        <div className='flex flex-col justify-between h-screen  lg:w-16 md:w-12 shadow-md bg-emerald-600  text-white'>
            <div>
                <ul>
                    <li className='p-2 hover:bg-emerald-700 hover:ring-emerald-700 ' title='homepage'>
                        <Link href='/'>
                            <span>
                                <h2 className="text-1xl font-semibold text-gray-800 dark:text-white text-center">icarus</h2>
                            </span>
                        </Link>
                    </li>
                    <li className='p-2 hover:bg-emerald-700 hover:ring-emerald-700 ' title='notes'>
                        <button onClick={() => setSideBarView(true)}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </span>
                        </button>
                    </li>
                    <li className='p-2 hover:bg-emerald-700 hover:ring-emerald-700' title='commit page'>
                        { noteTreeChanged ? <span class="flex w-3 h-3 absolute bg-red-500 rounded-full"></span> : null }
                        <button onClick={() => setSideBarView(false)}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </span>
                        </button>
                    </li>
                    <li className='p-2 hover:bg-emerald-700 hover:ring-emerald-700'>
                        <Link href='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                            </svg>
                        </Link>                        
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li className='flex justify-center p-2'>
                        <Avatar address={smartAccountAddress} size={50} />
                    </li>
                    <li className='p-2 hover:bg-emerald-700 hover:ring-emerald-700' title='settings'>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div >
            <SideBar sideBarView={sideBarView} setSideBarView={setSideBarView} setToggleNoteList={setToggleNoteList} />
        </div>
        <NoteList toggleNoteList={toggleNoteList} setToggleNoteList={setToggleNoteList} setContent={setContent}/>
        <div className='flex overflow-y-auto justify-center w-full items-center'>
            {content ? <Editor value={content} setContent={setContent} /> : null}
        </div>
    </div>
      )
    }
