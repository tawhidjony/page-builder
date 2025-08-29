import { cn } from "@/lib/utils";

export default function CanvasView() {
    return (
        <div className={cn("relative bg-background max-w-[362px] h-[661px] m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1  overflow-y-auto")}>
            board canvas
        </div>
    )
}
