import SideBar from "../../components/SideBar";

export default function NoteLayout({ children }) {
    return (

        <body>
            <div className="flex">
                <div>
                    <SideBar />
                </div>
                <div>
                    {children}
                </div>  
            </div>
        </body>

    );
  }


