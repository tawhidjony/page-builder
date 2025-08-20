import { useEffect, useState } from "react";
import { useDragDropLayoutElement } from "../provider/DragDropLayoutElement";
import InputComponent from "./components/Input";

export default function SettingsComponent() {
    const { selectedElement, setSelectedElement } = useDragDropLayoutElement()

    const [element, setElement] = useState()

    useEffect(() => {
        setElement(selectedElement?.layout?.[selectedElement?.index])
    }, [selectedElement])

    const onHandleInputChange = (filedName: any, value: any) => {
        const updatedData = { ...selectedElement }
        updatedData?.layout[selectedElement.index][filedName] = value
        setSelectedElement(updatedData)
    }

    return (
        <div>
            {element?.content &&
                <InputComponent
                    value={element?.content}
                    label={"Content"}
                    onInputChange={(value) => onHandleInputChange("content", value)}
                />
            }
        </div>
    )
}
