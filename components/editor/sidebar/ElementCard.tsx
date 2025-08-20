type IProps = {
    item: any
}

export default function ElementCard({ item }: IProps) {
    const Icon = item.icon
    return (
        <div className="flex justify-center p-3 flex-col space-y-2 h-[120px] items-center border border-dashed border-gray-400 rounded">
            <Icon className="w-8 h-8" />
            <span>{item.label}</span>
        </div>
    )
}
