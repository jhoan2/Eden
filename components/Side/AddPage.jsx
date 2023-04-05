import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useNoteStore } from '../store'
import { v4 as uuidv4 } from 'uuid';

export default function AddPage() {
  let [isOpen, setIsOpen] = useState(false)
  let [pageName, setPageName] = useState(' ')
  const noteTreeChanged = useNoteStore((state) => state.noteTreeChanged)
  const setNoteTreeChanged = useNoteStore((state) => state.setNoteTreeChanged)
  const addPage = useNoteStore((state) => state.addPage)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const submitPage = () => {
    //do I create a pageId here and how do I connect it to the actual note. 
    const pageId = uuidv4();
    const folderObject = {"id": pageId, "value": pageName, "canHaveChildren": false}
    if(!noteTreeChanged) {setNoteTreeChanged()}
    addPage(folderObject)
    setPageName(' ')
    closeModal()
  }

  return (
    <>
        <div  title='Add Page' className='flex justify-center w-6 rounded-md border border-gray-300 bg-white  py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100 ' onClick={openModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/>
                <path d="M5 8v12h14V8H5zm0-2h14V4H5v2zm15 16H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 10h4v4H7v-4zm0 6h10v2H7v-2zm6-5h4v2h-4v-2z"/>
            </svg>
        </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="inset-0 z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Page Title 
                  </Dialog.Title>
                  <div className="mt-2">
                    <input type='text' onChange={(e) => setPageName(e.target.value)} value={pageName} />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      onClick={submitPage}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}