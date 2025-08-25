import { TBuilderEditorProps } from "./build-editor.type";
import BuilderEditorView from "./builder-editor.view";

export default function BuilderEditorComponent<T>({ data }: TBuilderEditorProps<T>) {
    return (
        <BuilderEditorView data={data} />
    )
}
