import CanvasSidebarComponent from "../canvasSidebar/canvasSidebar.component";
import CanvasView from "./canvas.view";

export default function CanvasComponent() {
    return (
        <div className="flex flex-col w-full" >
            <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent ">
                <div className="flex w-full h-full">
                    <CanvasView />
                    <CanvasSidebarComponent />
                </div>
            </div>
        </div>
    )
}
