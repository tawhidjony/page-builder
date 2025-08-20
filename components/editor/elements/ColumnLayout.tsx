import { cn } from "@/lib/utils"
import { useState } from "react"
import { useDragDropLayoutElement } from "../provider/DragDropLayoutElement"
import ButtonElement from "./custom/Button.element"

export function ColumnLayout({ layout }: any) {
    const [dragOver, setDragOver] = useState(false)
    const { dragElementLayout, setEmailTemplete, emailTemplete, selectedElement, setSelectedElement } = useDragDropLayoutElement()
    const onDragOverHandler = (event: any, index: any) => {
        event.preventDefault()
        setDragOver({
            index: index,
            columnId: layout?.id
        })
    }
    const onDropHandler = () => {
        const index = dragOver?.index
        setEmailTemplete(prevItem => prevItem?.map(col => col?.id === layout.id ? { ...col, [index]: dragElementLayout.dragElement } : col))
        setDragOver(null)
    }

    const GetElementComponent = (element: any) => {

        if (element?.type === "Button") {
            return <ButtonElement {...element} />
        }
    }

    return (
        <div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
                    gap: "0px"
                }}
            >
                {Array.from({ length: layout?.numOfCol }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className={cn("border border-dashed bg-accent flex justify-center items-center px-2 py-2",
                                (index == dragOver?.index && dragOver.columnId) && "bg-background",
                                !layout?.[index]?.type && "bg-background/5 border border-dashed",
                                selectedElement?.layout?.id == layout?.id && selectedElement?.index == index && "border-blue-500 border-dashed"

                            )}
                            onDragOver={(event) => onDragOverHandler(event, index)}
                            onDrop={onDropHandler}
                            onClick={() => setSelectedElement({ layout: layout, index: index })}

                        >
                            {GetElementComponent(layout?.[index]) ?? "Empty"}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// 