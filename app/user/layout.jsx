import SideNav from "../../components/Side/SideNav";

export default async function NoteLayout({ children }) {
    
    return (

        <section className="flex h-screen overflow-y-hidden">
                <div>
                    <SideNav />
                </div>
                <div className="flex overflow-y-auto justify-center w-full items-center">
                    {children}
                </div>  
        </section>

    );
  }