import SideNav from "../../components/Side/SideNav";

export default async function NoteLayout({ children }) {
    
    return (
        <section className="flex h-screen overflow-y-hidden">
                <div className="w-full">
                    <SideNav />
                </div>
                <div>
                    {children}
                </div>
        </section>
    );
  }