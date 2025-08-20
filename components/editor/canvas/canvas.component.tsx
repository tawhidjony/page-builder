import { cn } from "@/lib/utils";
import { useState } from "react";
import { ColumnLayout } from "../elements/ColumnLayout";
import { useDragDropLayoutElement } from "../provider/DragDropLayoutElement";

export default function CanvasComponent() {
    const [dragOver, setDragOver] = useState(false)
    const { dragElementLayout, setEmailTemplete, emailTemplete } = useDragDropLayoutElement()
    const onDragOverCanvas = (e: any) => {
        e.preventDefault()
        setDragOver(true)

    }
    const onHandleDrop = () => {
        setDragOver(false)
        if (dragElementLayout?.dragLayout) {
            setEmailTemplete((prev) => [...prev, dragElementLayout?.dragLayout])
        }

    }
    const getLayoutComponent = (layout: any) => {
        if (layout?.type === "column") {
            return <ColumnLayout layout={layout} />
        }
    }
    // console.log("emailTemplete", emailTemplete);

    return (
        <div className={cn("w-[480px] bg-background rounded overflow-hidden shadow-lg h-[90%]", dragOver && "bg-purple-200")}
            onDragOver={onDragOverCanvas}
            onDrop={() => onHandleDrop()}
        >
            {emailTemplete?.length > 0 ? emailTemplete.map((item: any, index) => {
                return (
                    <div key={index} >
                        {getLayoutComponent(item)}
                    </div>
                )
            }) : (<div className="flex justify-center items-center h-full">Add Element</div>)}
        </div>
    )
}
