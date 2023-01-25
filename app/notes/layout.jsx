import SideNav from "../../components/SideNav";
// const getNotes = async() => {
//     const res = await fetch('http://localhost:8080/chain/31337/tables/1')
//     if(!res.ok) {
//         throw new Error('Faild to fetch data')
//     }
//     return res.json()
// }
export default async function NoteLayout({ children }) {
    // const notes = await getNotes();
    // const tableName = notes.name

    return (

        <body className="flex h-screen overflow-y-hidden">
                <div>
                    <SideNav />
                </div>
                <div className="flex overflow-y-auto justify-center w-full">
                    {children}
                </div>  
        </body>

    );
  }


