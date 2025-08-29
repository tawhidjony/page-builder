import { ElementType, FC } from "react"
import { IChildren } from "./element.type"
import { DivElement } from "./layouts/div"

export type IElementsType = "Div"

export type Element = {
    type: IElementsType
    construct: (id: string) => ElementProps
    buttonElement: { icon: ElementType, label: string }
    designerComponent: FC<{ elementProps: ElementProps }>
    rendererComponent: FC<{ elementProps: ElementProps }>
    propertiesComponent: FC<{ elementProps: ElementProps }>
}

export type ElementProps = {
    id: string | number
    type: IElementsType
    children: IChildren[]
}


type TElements = { [key in IElementsType]: Element }

export const Elements: TElements = {
    Div: DivElement,
}