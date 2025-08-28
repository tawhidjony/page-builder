import { Elements } from "@/components/elements/element";
import { ButtonElement } from "./buttonElement/buttonElement";

export default function ElementSidebarView() {
    return (
        <div className="p-4">
            <h2 className="mb-2">Layout</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  place-items-center">
                <ButtonElement formElement={Elements.Div} />
            </div>
            <h2 className="mb-2">Elements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  place-items-center">
                <ButtonElement formElement={Elements.Button} />
            </div>
        </div>
    )
}
