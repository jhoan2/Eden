import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function EditorMenu({editor}) {
  return (
    <div className='flex justify-center space-x-4 border-2 mt-4 sticky top-4 z-50 bg-white pt-2 pb-2'>
        <div className='flex space-x-2'>
            <button title='Undo' className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"/>
                </svg>
            </button>
            <button title='Redo' className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z"/>
                </svg>
            </button>
        </div>
        <Menu as="div" className="relative inline-block text-left" title='Styles'>
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Styles
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"/><path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/>
                    </svg>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item as="div" title='Block Quote' onClick={() => editor.chain().focus().toggleBlockquote().run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('blockquote') ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/>
                                    <path d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179zm-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C4.591 12.322 3.17 10.841 3.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179z"/>
                                </svg>
                                Block Quote
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Ordered List' onClick={() => editor.chain().focus().toggleOrderedList().run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('orderedList') ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/>
                                </svg>
                                Ordered List
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Bullet List' onClick={() => editor.chain().focus().toggleBulletList().run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('bulletList') ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/>
                                    <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/>
                                </svg>
                                Bullet List
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Code Block'onClick={() => editor.chain().focus().toggleCodeBlock().run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('codeBlock') ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm '
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/>
                                    <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm16 7l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12zM6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12zm4.416 5H9.116l3.64-10h2.128l-3.64 10z"/>
                                </svg>
                                Code Block
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Paragraph' onClick={() => editor.chain().focus().setParagraph().run()}>
                        {({active}) => (
                            <button
                                className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm border-t-2'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/>
                                    <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z"/>
                                </svg>
                                Paragraph
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Heading 1' onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/>
                                    <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z"/>
                                </svg>
                                Heading 1
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Heading 2' onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/>
                                    <path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z"/>
                                </svg>
                                Heading 2
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Heading 3' onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/>
                                    <path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z"/>
                                </svg>
                                Heading 3
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Heading 4' onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('heading', { level: 4 }) ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/>
                                    <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm9-12v8h1.5v2H22v2h-2v-2h-5.5v-1.34l5-8.66H22zm-2 3.133L17.19 16H20v-4.867z"/>
                                </svg>
                                Heading 4
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Heading 5' onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('heading', { level: 5 }) ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/>
                                    <path d="M22 8v2h-4.323l-.464 2.636c.33-.089.678-.136 1.037-.136 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.827 0-3.367-1.224-3.846-2.897l1.923-.551c.24.836 1.01 1.448 1.923 1.448 1.105 0 2-.895 2-2s-.895-2-2-2c-.63 0-1.193.292-1.56.748l-1.81-.904L16 8h6zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z"/>
                                </svg>
                                Heading 5
                            </button>

                        )}
                    </Menu.Item>
                    <Menu.Item as="div" title='Heading 6' onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} >
                        {() => (
                            <button
                                className={classNames(
                                    editor.isActive('heading', { level: 6 }) ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'flex justify-between w-full px-4 py-2 text-sm'
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/>
                                    <path d="M21.097 8l-2.598 4.5c2.21 0 4.001 1.79 4.001 4s-1.79 4-4 4-4-1.79-4-4c0-.736.199-1.426.546-2.019L18.788 8h2.309zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"/>
                                </svg>
                                Heading 6
                            </button>

                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
        <div className='flex space-x-2'>
            <button title='Insert Image' className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/><path d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                </svg>
            </button>
        </div>
    </div>
  )
}
