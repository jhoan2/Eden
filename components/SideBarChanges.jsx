import ChangedNotes from "./ChangedNotes";

export default function SideBarChanges({allNotes}) {
    const getChangedNotes = () => {
        const comps = [];
        allNotes.forEach((value, key) => comps.push(<ChangedNotes value={value} key ={key} />));
        return comps
    }
  return (
    <div>{getChangedNotes()}</div>
  )
}
