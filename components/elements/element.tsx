import { CSSProperties, ElementType, FC } from "react"
import { IChildren } from "./element.type"
import { ButtonElement } from "./elements/button"
import { DivElement } from "./layouts/div"

export type IElementsType = "Div" | "Button"

export type Element = {
    type: IElementsType
    construct: (id: string) => ElementProps
    buttonElement: { icon: ElementType, label: string }
    designerComponent: FC<{ elementProps: ElementProps }>
    rendererComponent: FC<{ elementProps: ElementProps }>
    propertiesComponent: FC<{ elementProps: ElementProps }>
}

export type ElementLayoutProps = {
    id: string | number
    type: IElementsType
    style: CSSProperties
    children: IChildren[]
}

export type ElementProps = ElementLayoutProps & {
    id: string | number
    type: IElementsType
    style: CSSProperties
    extraAttributes?: any
    parentId?: string
}


type TElements = { [key in IElementsType]: Element }

export const Elements: TElements = {
    Div: DivElement,
    Button: ButtonElement,
}