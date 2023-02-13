import React, { useContext } from 'react'
import { AppContext } from '../AppProvider'

export default function SideBarChanges() {
  const {changedNotes} = useContext(AppContext)
  console.log(changedNotes)
  return (
    <div>
      <button>Publish</button>
    </div>

  )
}
