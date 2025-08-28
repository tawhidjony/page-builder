import { idGenerator } from "@/components/function/idGenerator";
import { useStore } from "@/components/store";
import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import debounce from "lodash.debounce";
import { Delete, Edit, Grid2X2 } from "lucide-react";
import React, { Fragment, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Element, ElementProps, Elements, IElementsType } from "../element";


const type: IElementsType = "Div"

const extraAttributes = {
    label: "Div",
    type: "column",
    style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: "",
        margin: "",
        backgroundColor: "#000000",
        borderRadius: ""
    },
    children: []
}

export const DivElement: Element = {
    type,
    construct: (id: string) => ({
        id,
        type,
        style: {},
        children: [],
        extraAttributes: {
            ...extraAttributes,
            isSelected: false
        }
    }),

    buttonElement: {
        icon: Grid2X2,
        label: "Div"
    },
    designerComponent: DesignerComponent,
    rendererComponent: RendererComponent,
    propertiesComponent: PropertiesComponent
}

type customInstances = ElementProps & {
    extraAttributes: typeof extraAttributes
}


function DesignerComponent({ elementProps }: { elementProps: ElementProps }) {
    const { extraAttributes } = elementProps as customInstances
    const [isHover, setHover] = useState(false)
    const { updateElements, selectElement, selectedElement, deleteElement } = useStore()
    const { setNodeRef, isOver } = useDroppable({
        id: elementProps?.id,
        data: {
            isDivLayoutArea: true
        },
    });

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;

            // Check if the drop is happening on this specific div
            if (over.id !== elementProps.id) return;

            // Check if this is a sidebar element being dragged
            const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;
            if (!isDesignerBtnElement) return;

            const draggedElement = active.data.current?.element;
            if (!draggedElement) return;

            const safeElement = {
                ...JSON.parse(JSON.stringify(draggedElement)),
                id: idGenerator(),
            };
            updateElements(safeElement, String(over?.id))
        },
    });

    const handleElementSelect = (elementProps: ElementProps, e?: React.MouseEvent) => {
        // If the click event is provided and the target is a child element, don't select the div
        if (e && e.target !== e.currentTarget) {
            return
        }
        selectElement(elementProps)
    }

    const handleElementDelete = (elementProps: ElementProps) => {
        deleteElement(elementProps.id as string)
        // Clear the selection after deletion
        useStore.getState().selectElement(null)
    }


    const isSelected = selectedElement?.id === elementProps.id

    return (
        <div
            ref={setNodeRef}
            className={cn("w-full p-3 border m-2 relative",
                isOver && "ring-1 ring-green-500/50",
                isHover && "border border-blue-500",
                isSelected && "ring-2 ring-blue-500 border-blue-500",
            )}
            style={extraAttributes?.style}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={(e) => handleElementSelect(elementProps, e)}
        >
            {isHover && <div className="absolute top-0 right-0 bg-primary px-2 py-1 text-white cursor-pointer">
                <div className="flex gap-2 items-center justify-center">
                    <Edit className="w-4 h-4 text-red-600" onClick={(e) => {
                        e.stopPropagation()
                        handleElementSelect(elementProps)
                    }} />
                    <Delete className="w-4 h-4 text-red-600" onClick={(e) => {
                        e.stopPropagation()
                        handleElementDelete(elementProps)
                    }} />
                </div>
            </div>}
            {DesignerElementDiv({ elementProps })}
        </div>
    )
}

function RendererComponent({ elementProps }: { elementProps: ElementProps }) {
    return (<></>)
}

type DivFormData = {
    display: string
    flexDirection: string
    justifyContent: string
    alignItems: string
    padding: string
    margin: string
    backgroundColor: string
    borderRadius: string
}

function PropertiesComponent({ elementProps }: { elementProps: ElementProps }) {
    const { updateElementProperties } = useStore()
    const { extraAttributes } = elementProps as customInstances

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DivFormData>({
        defaultValues: {
            display: extraAttributes?.style?.display || 'flex',
            flexDirection: extraAttributes?.style?.flexDirection || 'row',
            justifyContent: extraAttributes?.style?.justifyContent || 'flex-start',
            alignItems: extraAttributes?.style?.alignItems || 'stretch',
            padding: extraAttributes?.style?.padding || '',
            margin: extraAttributes?.style?.margin || '',
            backgroundColor: extraAttributes?.style?.backgroundColor || '#000000',
            borderRadius: extraAttributes?.style?.borderRadius || ''
        },
        mode: 'onChange'
    })

    // Reset form when selected element changes
    React.useEffect(() => {
        if (elementProps) {
            const currentStyle = extraAttributes?.style || {}
            setValue('display', currentStyle.display || 'flex')
            setValue('flexDirection', currentStyle.flexDirection || 'row')
            setValue('justifyContent', currentStyle.justifyContent || 'flex-start')
            setValue('alignItems', currentStyle.alignItems || 'stretch')
            setValue('padding', currentStyle.padding || '')
            setValue('margin', currentStyle.margin || '')
            setValue('backgroundColor', currentStyle.backgroundColor || '#000000')
            setValue('borderRadius', currentStyle.borderRadius || '')
        }
    }, [elementProps, extraAttributes?.style, setValue])

    const watchedValues = watch()

    // Debounced update function
    const debouncedUpdate = useCallback(
        debounce((values: DivFormData) => {
            const currentStyle = extraAttributes?.style || {}
            const updatedStyle = {
                ...currentStyle,
                ...values
            }
            updateElementProperties(elementProps.id as string, {
                extraAttributes: {
                    ...extraAttributes,
                    style: updatedStyle
                }
            })
        }, 300),
        [extraAttributes, elementProps.id, updateElementProperties]
    )



    // Watch for changes and update the element with debouncing
    React.useEffect(() => {
        debouncedUpdate(watchedValues)

        // Cleanup function to cancel pending debounced calls
        return () => {
            debouncedUpdate.cancel()
        }
    }, [watchedValues, debouncedUpdate])

    return (
        <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">Div Properties</h3>

            <form className="space-y-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Display</label>
                    <select
                        {...register("display")}
                        className="w-full p-2 border rounded"
                    >
                        <option value="flex">Flex</option>
                        <option value="block">Block</option>
                        <option value="inline">Inline</option>
                        <option value="inline-block">Inline Block</option>
                        <option value="grid">Grid</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Flex Direction</label>
                    <select
                        {...register("flexDirection")}
                        className="w-full p-2 border rounded"
                    >
                        <option value="row">Row</option>
                        <option value="column">Column</option>
                        <option value="row-reverse">Row Reverse</option>
                        <option value="column-reverse">Column Reverse</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Justify Content</label>
                    <select
                        {...register("justifyContent")}
                        className="w-full p-2 border rounded"
                    >
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="center">Center</option>
                        <option value="space-between">Space Between</option>
                        <option value="space-around">Space Around</option>
                        <option value="space-evenly">Space Evenly</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Align Items</label>
                    <select
                        {...register("alignItems")}
                        className="w-full p-2 border rounded"
                    >
                        <option value="stretch">Stretch</option>
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="center">Center</option>
                        <option value="baseline">Baseline</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Padding</label>
                    <input
                        {...register("padding", {
                            pattern: {
                                value: /^(\d+(\.\d+)?(px|rem|em|%)?\s*)+$/,
                                message: "Invalid padding format (e.g., 10px, 1rem)"
                            }
                        })}
                        type="text"
                        className={`w-full p-2 border rounded ${errors.padding ? 'border-red-500' : ''}`}
                        placeholder="e.g., 10px, 1rem"
                    />
                    {errors.padding && (
                        <p className="text-red-500 text-xs mt-1">{errors.padding.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Margin</label>
                    <input
                        {...register("margin", {
                            pattern: {
                                value: /^(\d+(\.\d+)?(px|rem|em|%)?\s*)+$/,
                                message: "Invalid margin format (e.g., 10px, 1rem)"
                            }
                        })}
                        type="text"
                        className={`w-full p-2 border rounded ${errors.margin ? 'border-red-500' : ''}`}
                        placeholder="e.g., 10px, 1rem"
                    />
                    {errors.margin && (
                        <p className="text-red-500 text-xs mt-1">{errors.margin.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Background Color</label>
                    <input
                        {...register("backgroundColor")}
                        type="color"
                        className="w-full p-1 border rounded h-10"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Border Radius</label>
                    <input
                        {...register("borderRadius", {
                            pattern: {
                                value: /^(\d+(\.\d+)?(px|rem|em|%)?\s*)+$/,
                                message: "Invalid border radius format (e.g., 5px, 10px)"
                            }
                        })}
                        type="text"
                        className={`w-full p-2 border rounded ${errors.borderRadius ? 'border-red-500' : ''}`}
                        placeholder="e.g., 5px, 10px"
                    />
                    {errors.borderRadius && (
                        <p className="text-red-500 text-xs mt-1">{errors.borderRadius.message}</p>
                    )}
                </div>
            </form>
        </div>
    )
}

function DesignerElementDiv({ elementProps }: { elementProps: ElementProps }) {
    const { children } = elementProps
    const { selectedChildElement } = useStore()

    if (children.length <= 0) return <>Drop Here</>
    return (
        <Fragment>
            {children.length > 0 && children.map((item) => {
                // Convert IChildren back to ElementProps for rendering
                const childElementProps: ElementProps = {
                    id: item.id,
                    type: item.type as IElementsType,
                    style: item.props,
                    children: [],
                    parentId: elementProps.id as string
                }
                const DesignerElement = Elements[item?.type as IElementsType].designerComponent
                return <DesignerElement key={item.id} elementProps={childElementProps} />
            })}
        </Fragment>
    )
}
