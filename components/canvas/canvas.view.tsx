import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { ElementProps, Elements, IElementsType } from "../elements/element";
import { idGenerator } from "../function/idGenerator";
import { useStore } from "../store";

export default function CanvasView() {
    const { elements, setElements } = useStore()
    const droppable = useDroppable({
        id: "canvas-drop-area",
        data: {
            isCanvasDropArea: true
        }
    })
    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            console.log("canvas", event);

            const { active, over } = event
            if (!active || !over) return
            const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement
            const isDesignerBtnElementType = active?.data?.current?.type
            const isCanvasDropArea = over?.data?.current?.isCanvasDropArea
            const droppingSidebarBtnOverDesignerDropArea = (isDesignerBtnElement && isCanvasDropArea) && isDesignerBtnElementType === "Div"

            // first senario
            if (droppingSidebarBtnOverDesignerDropArea) {
                const type = active.data?.current?.type
                const newElement = Elements[type as IElementsType].construct(idGenerator())
                setElements(newElement)
                return;
            }

        }
    })

    // console.log("elements", elements);

    return (
        <div className="p-4 w-full">
            <div className="relative max-w-[362px] h-[661px] m-auto">
                <div
                    ref={droppable.setNodeRef}
                    className={cn("relative bg-background max-w-[362px] h-[661px] m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1  overflow-y-auto",
                        droppable.isOver && "ring-2 ring-primary/20"
                    )}>
                    {elements.length > 0 && (
                        <div className="flex flex-col w-full">
                            {elements.map((element, index) => {
                                return <DesignerElementWrapper key={index} element={element} />
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


function DesignerElementWrapper({ element }: { element: ElementProps }) {
    const DesignerElement = Elements[element.type].designerComponent
    return (
        <div className="relative h-auto flex flex-col text-foreground hover:cursor-pointer">
            <div className={cn("flex w-full h-auto items-center")}>
                <DesignerElement elementProps={element} />
            </div>
        </div>
    )
}
