import SideNav from "../../components/SideNav";

export default function NoteLayout({ children }) {
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


