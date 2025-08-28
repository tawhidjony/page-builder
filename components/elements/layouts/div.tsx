import { idGenerator } from "@/components/function/idGenerator";
import { useStore } from "@/components/store";
import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { Delete, Edit, Grid2X2 } from "lucide-react";
import { Fragment, useState } from "react";
import { Element, ElementProps, Elements, IElementsType } from "../element";


const type: IElementsType = "Div"

const extraAttributes = {
    label: "Div",
    type: "column",
    style: {
        display: "flex",
    },
    children: []
}

export const DivElement: Element = {
    type,
    construct: (id: string) => ({
        id,
        type,
        style: {},
        children: [],
        extraAttributes: {
            ...extraAttributes,
            isSelected: false
        }
    }),

    buttonElement: {
        icon: Grid2X2,
        label: "Div"
    },
    designerComponent: DesignerComponent,
    rendererComponent: RendererComponent,
    propertiesComponent: PropertiesComponent
}

type customInstances = ElementProps & {
    extraAttributes: typeof extraAttributes
}


function DesignerComponent({ elementProps }: { elementProps: ElementProps }) {
    const { extraAttributes } = elementProps as customInstances
    const [isHover, setHover] = useState(false)
    const { updateElements } = useStore()
    const { setNodeRef, isOver } = useDroppable({
        id: elementProps?.id,
        data: {
            isDivLayoutArea: true
        },
    });

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;
            const draggedElement = active.data.current?.element;
            if (!draggedElement) return;
            const safeElement = {
                ...JSON.parse(JSON.stringify(draggedElement)),
                id: idGenerator(),
            };
            updateElements(safeElement, String(over?.id))
        },
    });

    const selectedElement = (elementProps: ElementProps) => {
        console.log(elementProps)
    }


    return (
        <div
            ref={setNodeRef}
            className={cn("w-full p-3 border m-2 relative",
                isOver && "ring-1 ring-green-500/50",
                isHover && "border border-blue-500",
            )}
            style={extraAttributes?.style}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {isHover && <div className="absolute top-0 right-0 bg-primary px-2 py-1 text-white cursor-pointer">
                <div className="flex gap-2 items-center justify-center">
                    <Edit className="w-4 h-4 text-red-600" onClick={() => selectedElement(elementProps)} />
                    <Delete className="w-4 h-4 text-red-600" />
                </div>
            </div>}
            {DesignerElementDiv({ elementProps })}
        </div>
    )
}

function RendererComponent({ elementProps }: { elementProps: ElementProps }) {
    return (<></>)
}

function PropertiesComponent({ elementProps }: { elementProps: ElementProps }) {
    return (<> </>)
}

function DesignerElementDiv({ elementProps }: { elementProps: ElementProps }) {
    const { children } = elementProps
    if (children.length <= 0) return <>Drop Here</>
    return (
        <Fragment>
            {children.length > 0 && children.map((item) => {
                const DesignerElement = Elements[item?.type as IElementsType].designerComponent
                return <DesignerElement key={item.id} elementProps={item as any} />
            })}
        </Fragment>
    )
}
