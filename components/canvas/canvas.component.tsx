import ElementSidebarComponent from "../elementSidebar/elementSidebar.component";
import CanvasView from "./canvas.view";

export default function CanvasComponent() {
    return (
        <div className="flex flex-col w-full" >
            <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent ">
                <div className="flex w-full h-full">
                    <div className="p-4 w-full">
                        <div className="relative max-w-[362px] h-[661px] m-auto">
                            <CanvasView />
                        </div>
                    </div>
                    <ElementSidebarComponent />
                </div>
            </div>
        </div>
    )
}
