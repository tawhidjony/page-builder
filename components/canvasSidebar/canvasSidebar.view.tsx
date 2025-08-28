import ElementSidebarComponent from "./elementSidebar/elementSidebar.component";

export default function CanvasSidebarView() {
    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-4 border-l-2 border-muted bg-background overflow-y-auto h-full ">
            {/* {!selectedElement && <FormElementSiderBar />}
            {selectedElement && <FormPropertiesSiderBar />} */}
            {/* {themeSetting ? <PropertiesLayoutSetting /> : selectedElement ? <FormPropertiesSiderBar /> : !selectedElement && <FormElementSiderBar />} */}
            <ElementSidebarComponent />
        </aside>
    )
}
