import { useNoteStore } from "../../../components/store"
import StoreInitializer from '../../../components/StoreInitializer'
import { redirect } from 'next/navigation';

const getNoteTree = async ({userId}) => {
  const data = await fetch(`http://localhost:3000/api/noteTree?id=${userId}`, {method: "GET"})
  const { noteTree } = await data.json()
  if (!data.ok) {
    throw new Error('Could not retrieve note tree')
  }
  return noteTree
}


export default async function NoteTreePage({params}) {
  const { userId } = params
  if(!userId) {
    redirect('/')
  }

  const noteTree = await getNoteTree({userId})
  useNoteStore.setState({noteTree: noteTree})

  return(
  <section>
    <StoreInitializer noteTree={noteTree}/>
  </section>
  )
}