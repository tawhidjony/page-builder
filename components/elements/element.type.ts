export interface IChildren {
    id: string
    type: string
    props: Props
}

export interface Props {
    [key: string]: string | number | boolean
}
