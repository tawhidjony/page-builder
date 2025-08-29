import { Grid2X2 } from "lucide-react";
import { Element, ElementProps, IElementsType } from "../element";
import { IChildren } from "../element.type";


const type: IElementsType = "Div"

const children: IChildren[] = []

export const DivElement: Element = {
    type,
    construct: (id: string) => ({
        id,
        type,
        children
    }),

    buttonElement: {
        icon: Grid2X2,
        label: "DivElement"
    },
    designerComponent: DesignerComponent,
    rendererComponent: RendererComponent,
    propertiesComponent: PropertiesComponent
}


function DesignerComponent({ elementProps }: { elementProps: ElementProps }) {
    return (<></>)
}

function RendererComponent({ elementProps }: { elementProps: ElementProps }) {
    return (<></>)
}

function PropertiesComponent({ elementProps }: { elementProps: ElementProps }) {
    return (<> </>)
}