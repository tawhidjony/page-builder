import { ElementProps, Elements, IElementsType } from "../elements/element";
import { useStore } from "../store";
import ElementSidebarComponent from "./elementSidebar/elementSidebar.component";

export default function CanvasSidebarView() {
    const { selectedElement, selectedChildElement } = useStore()

    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-4 border-l-2 border-muted bg-background overflow-y-auto h-full ">
            {selectedChildElement ? (
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Properties</h2>
                        <button
                            onClick={() => useStore.getState().selectChildElement(null)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    {(() => {
                        // Convert IChildren back to ElementProps for the properties component
                        const childElementProps: ElementProps = {
                            id: selectedChildElement.element.id,
                            type: selectedChildElement.element.type as IElementsType,
                            style: selectedChildElement.element.props,
                            children: [],
                            parentId: selectedChildElement.parentId,
                            extraAttributes: {
                                label: selectedChildElement.element.label || "Button",
                                style: selectedChildElement.element.props
                            }
                        }
                        const PropertiesComponent = Elements[selectedChildElement.element.type as IElementsType].propertiesComponent
                        return <PropertiesComponent elementProps={childElementProps} />
                    })()}
                </div>
            ) : selectedElement ? (
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Properties</h2>
                        <button
                            onClick={() => useStore.getState().selectElement(null)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    {(() => {
                        const PropertiesComponent = Elements[selectedElement.type].propertiesComponent
                        return <PropertiesComponent elementProps={selectedElement} />
                    })()}
                </div>
            ) : (
                <ElementSidebarComponent />
            )}
        </aside>
    )
}
