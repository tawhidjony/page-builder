import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { ButtonElementOverlay } from "../canvasSidebar/elementSidebar/buttonElement/buttonElement";
import { Elements, IElementsType } from "../elements/element";

export default function DragOverlayView() {
    const [dragedItem, setDraggedItem] = useState<Active | null>(null);
    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        },
    })
    if (!dragedItem) return null
    let node = <div>No drag overlay </div>
    const isSidebarBtnElement = dragedItem?.data?.current?.isDesignerBtnElement
    if (isSidebarBtnElement) {
        const type = dragedItem?.data?.current?.type as IElementsType
        node = <ButtonElementOverlay formElement={Elements[type]} />
    }

    return <DragOverlay>{node}</DragOverlay>
}
