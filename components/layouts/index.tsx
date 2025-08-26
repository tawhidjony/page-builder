
type ICanvasLayoutProps = {
    children: React.ReactNode
}


export default function CanvasLayout({ children }: ICanvasLayoutProps) {
    return (
        <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
            <main className='flex w-full flex-grow mx-auto'>{children}</main>
        </div>
    )
}
