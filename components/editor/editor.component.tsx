import CanvasComponent from "./canvas/canvas.component";
import SettingsComponent from "./settings/settings.component";
import SidebarComponent from "./sidebar/sidebar.component";

export default function EditorComponent() {
    return (
        <div className="h-screen flex flex-col">
            <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
                <div>Logo</div>
                <div>Profile</div>
            </header>
            <main className="flex-1">
                <div className="grid grid-cols-12 h-full">
                    {/* Sidebar */}
                    <div className="col-span-3">
                        <div className="flex flex-col flex-grow h-full max-h-screen overflow-y-auto bg-gray-800 text-white">
                            <SidebarComponent />
                        </div>
                    </div>

                    {/* Canvas area */}
                    <div className="col-span-7 bg-gray-700">
                        <div className=" flex justify-center items-center h-full">
                            <CanvasComponent />
                        </div>
                    </div>

                    {/* Properties */}
                    <div className="col-span-2 bg-gray-600 text-white">
                        <div className=" flex  h-full p-4 overflow-y-auto">
                            <SettingsComponent />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
