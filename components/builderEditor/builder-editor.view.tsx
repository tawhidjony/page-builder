import { DndContext } from "@dnd-kit/core";
import CanvasComponent from "../canvas/canvas.component";
import DragOverlayComponent from "../dragOverlay/dragOverlay.component";
import CanvasLayout from "../layouts";
import { usePlugin } from "../plugin";
import { TBuilderEditorProps } from "./build-editor.type";

export default function BuilderEditorView<T>({ data }: TBuilderEditorProps<T>) {
    // console.log("BuilderEditorView", data);
    const { sensors } = usePlugin()

    return (
        <CanvasLayout>
            <DndContext sensors={sensors} >
                <CanvasComponent />
                <DragOverlayComponent />
            </DndContext>
        </CanvasLayout>
    )
}
