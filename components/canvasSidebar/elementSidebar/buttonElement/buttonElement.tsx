import { Element } from "@/components/elements/element"
import { cn } from "@/lib/utils"
import { Button } from "@/uikit/ui/button"
import { useDraggable } from "@dnd-kit/core"

type Props = {
    formElement: Element
}

export const ButtonElement = ({ formElement }: Props) => {

    const { label, icon: Icon } = formElement.buttonElement
    const draggable = useDraggable({
        id: formElement.type,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true,
            element: formElement.construct(formElement.type)
        }
    })
    return (
        <Button
            ref={draggable.setNodeRef}
            variant="outline"
            className={cn("flex flex-col  w-[120px] h-[120px] cursor-grab gap-2", draggable.isDragging && "ring-2 ring-primary")}
            {...draggable.listeners}
            {...draggable.attributes}
        >
            <Icon className="h-10 w-10 text-primary cursor-grab" />
            <p className="text-xs">{label}</p>
        </Button >
    )
}

export const ButtonElementOverlay = ({ formElement }: Props) => {
    const { label, icon: Icon } = formElement.buttonElement

    return (
        <Button
            variant="outline"
            className={"flex flex-col  w-[120px] h-[120px] cursor-grab gap-2"}
        >
            <Icon className="h-10 w-10 text-primary cursor-grab" />
            <p className="text-xs">{label}</p>
        </Button >
    )
}
