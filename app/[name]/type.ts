export interface IThemeDto {
    id: string
    project_name: string
    image: string
    description: string
    time: string
    templete: Templete[]
    publish: boolean
}

export interface Templete {
    id: string
    type: string
    children: Children[]
}

export interface Children {
    id: string
    type: string
    props: Props
}

export interface Props {
    [key: string]: string | number | boolean
}
