import { elements } from "@/data/element";
import { layout } from "@/data/layout";
import { useDragDropLayoutElement } from "../provider/DragDropLayoutElement";
import ElementCard from "./ElementCard";

export default function SidebarComponent() {

    const { setDragElementLayout } = useDragDropLayoutElement()

    const onDragLayoutStart = (layout: any) => {
        setDragElementLayout({
            dragLayout: {
                ...layout,
                id: Date.now()
            }
        })
    }

    const onDragElementStart = (layout: any) => {
        setDragElementLayout({
            dragElement: {
                ...layout,
                id: Date.now()
            }
        })
    }

    return (
        <div className="p-4">
            <h5 className="my-5 text-2xl font-bold border-b pb-2">Layouts</h5>
            <div className="grid grid-cols-3 gap-4 ">
                {layout?.map((layout, index) => {
                    return (
                        <div key={index} draggable onDragStart={() => onDragLayoutStart(layout)} >
                            <ElementCard item={layout} />
                        </div>
                    )
                })}
            </div>
            <h5 className="my-5 text-2xl font-bold border-b pb-2">Elements</h5>
            <div className="grid grid-cols-3 gap-4 ">
                {elements?.map((element, index) => {
                    return (
                        <div key={index} draggable onDragStart={() => onDragElementStart(element)} >
                            <ElementCard item={element} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
