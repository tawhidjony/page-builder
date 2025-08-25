import { TBuilderEditorProps } from "./build-editor.type";

export default function BuilderEditorView<T>({ data }: TBuilderEditorProps<T>) {
    console.log("BuilderEditorView", data);

    return (
        <div>BuilderEditor</div>
    )
}
