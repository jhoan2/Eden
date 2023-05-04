'use client'
import { useState } from 'react';
import { Database } from "@tableland/sdk";
import { useNoteStore } from './store';
import { toast } from 'react-toastify';
const db = new Database()

export default function CreateTableButton() {
  const smartAccountAddress = useNoteStore((state) => state.smartAccountAddress)
  const updateUserTableName = useNoteStore((state) => state.updateUserTableName)
  const userTableName = useNoteStore((state) => state.userTableName)
  const [ loading, setLoading ] = useState(false)
  
  const createTable = async () => {
    const { meta: create } = await db.prepare("CREATE TABLE icarus_user (id text, content text, created_at text, updated_at text);").run();
    const tableName = create.txn.name;
    if(tableName) {
      toast.success(`Successfully created ${tableName}`)
      updateUserTableName(tableName)
    }
    return 
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleClick = async (smartAccountAddress) => {
    setLoading(true);
    const obj = {smartAccountAddress: smartAccountAddress}
    try {
      await fetch('http://icarus.community/api/admin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      createTable()
    } catch (e) {
      console.log({message: e})
    }
    await delay(3000) // wait 3s for it to settle on blockchain
    setLoading(false)
  }

  const insertInDevTable = async () => {
    setLoading(true);
    if (!userTableName) {
      toast.error('Your table does not exist!')
      setLoading(false)
      return
    }
    const insert = await db.prepare(`INSERT INTO icarus_80001_5937 (pub_address, owned_table, note_tree_cid) VALUES (?, ?, ?)`).bind(smartAccountAddress, userTableName, '').run()

    if(!insert.success) {
        toast.error('Could not insert')
      } else {
        toast.success('Was able to insert, go ahead and launch app')
        window.location.reload()
      }
    setLoading(false)
    return
  }


  return (
    <div>
      {
        userTableName ?
          <div>
            {loading ? 
              <button
              className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                Loading ...
              </button>
              :
              <button
              onClick={() => insertInDevTable()}
              className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                Join the Community
              </button>
            }
          </div>
         : 
        <div>
          { loading ? 
            <button
            className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
              </svg>
              Loading ...
            </button> :
            <button 
            className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            onClick={() => handleClick(smartAccountAddress)}
            >
              Create Table
              <span className="text-gray-400" aria-hidden="true">
                &rarr;
              </span>
            </button> 
          }
        </div>
      }
    </div>
  )
}
