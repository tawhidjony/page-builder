import { LucideBookX } from "lucide-react";
import { Element, ElementProps, IElementsType } from "../element";


const type: IElementsType = "Button"

const extraAttributes = {
    label: "Button",
    type: type,
    style: {
        color: "red",
        backgroundColor: "red",
        fontSize: "20px",
    }
}


export const ButtonElement: Element = {
    type,
    construct: (id: string) => ({
        id,
        type,
        children: [],
        style: {}
    }),

    buttonElement: {
        icon: LucideBookX,
        label: "Button"
    },
    designerComponent: DesignerComponent,
    rendererComponent: RendererComponent,
    propertiesComponent: PropertiesComponent
}

type customInstances = ElementProps & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementProps }: { elementProps: ElementProps }) {

    return (
        <button className="border rounded  border-blue-500/50  ">
            button
        </button>
    )
}

function RendererComponent({ elementProps }: { elementProps: ElementProps }) {
    return (<></>)
}

function PropertiesComponent({ elementProps }: { elementProps: ElementProps }) {
    return (<> </>)
}