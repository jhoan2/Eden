'use client'
import React, { useContext } from 'react';
import { Database } from "@tableland/sdk";
import { AppContext } from './AppProvider';

const db = new Database()

export default function CreateTableButton() {
  const { updateTableName } = useContext(AppContext)
  const createTable = async () => {
    const { meta: create } = await db
	.prepare("CREATE TABLE my_sdk_table (id integer primary key, title text, content text, created_at text, updated_at text);")
	.run();
  let tableName = create.txn.name
  updateTableName(tableName)
}
  return (
    <button 
    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
    onClick={() => createTable()}
    >
    Create Table
    <span className="text-gray-400" aria-hidden="true">
      &rarr;
    </span>
  </button>
  )
}
