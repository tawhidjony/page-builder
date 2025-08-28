import { useStore } from "@/components/store";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";
import { LucideBookX } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Element, ElementProps, IElementsType } from "../element";


const type: IElementsType = "Button"

const extraAttributes = {
    label: "Button",
    type: type,
    style: {
        color: "#ffffff",
        backgroundColor: "#3b82f6",
        fontSize: "16px",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "500"
    }
}


export const ButtonElement: Element = {
    type,
    construct: (id: string) => ({
        id,
        type,
        children: [],
        style: {},
        extraAttributes: {
            ...extraAttributes,
            isSelected: false
        }
    }),

    buttonElement: {
        icon: LucideBookX,
        label: "Button"
    },
    designerComponent: DesignerComponent,
    rendererComponent: RendererComponent,
    propertiesComponent: PropertiesComponent
}

type customInstances = ElementProps & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementProps }: { elementProps: ElementProps }) {
    const [isHover, setHover] = useState(false)
    const { selectChildElement, selectedChildElement } = useStore()

    const isSelected = selectedChildElement?.element.id === elementProps.id

    const handleSelect = (e: React.MouseEvent) => {
        // Prevent event bubbling to parent div
        e.stopPropagation()

        // Convert ElementProps back to IChildren format for selection
        const childElement = {
            id: elementProps.id as string,
            type: elementProps.type,
            props: elementProps.style,
            label: elementProps.extraAttributes?.label || "Button"
        }
        selectChildElement(childElement, elementProps.parentId)
    }

    return (
        <div
            className={cn("relative inline-block",
                isHover && "ring-1 ring-blue-500",
                isSelected && "ring-2 ring-blue-500"
            )}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleSelect}
        >
            <button
                className="border rounded border-blue-500/50 px-2 py-1 bg-blue-500"
                style={elementProps.style}
                onClick={(e) => e.stopPropagation()}
            >
                {elementProps.extraAttributes?.label || "Button"}
            </button>
            {isHover && (
                <div className="absolute -top-8 right-0 bg-primary px-2 py-1 text-white text-xs rounded">
                    Click to edit
                </div>
            )}
        </div>
    )
}

function RendererComponent({ elementProps }: { elementProps: ElementProps }) {
    return (<></>)
}

type ButtonFormData = {
    label: string
    backgroundColor: string
    color: string
    fontSize: string
    padding: string
    borderRadius: string
    fontWeight: string
}

function PropertiesComponent({ elementProps }: { elementProps: ElementProps }) {
    const { updateChildElementProperties, selectedChildElement, deleteChildElement } = useStore()

    // Use selectedChildElement data instead of elementProps for form values
    const currentLabel = selectedChildElement?.element.label || "Button"
    const currentStyle = selectedChildElement?.element.props || {}

    const { register, watch, setValue, formState: { errors } } = useForm<ButtonFormData>({
        defaultValues: {
            label: currentLabel,
            backgroundColor: String(currentStyle.backgroundColor || '#3b82f6'),
            color: String(currentStyle.color || '#ffffff'),
            fontSize: String(currentStyle.fontSize || '16px'),
            padding: String(currentStyle.padding || '8px 16px'),
            borderRadius: String(currentStyle.borderRadius || '4px'),
            fontWeight: String(currentStyle.fontWeight || '500')
        },
        mode: 'onChange'
    })

    const watchedValues = watch()

    // Debounced update function
    const debouncedUpdate = useCallback(
        debounce((values: ButtonFormData) => {
            if (!selectedChildElement) return

            const currentProps = selectedChildElement.element.props || {}
            const currentLabel = selectedChildElement.element.label || "Button"

            const hasStyleChanges = Object.entries(values).some(([key, value]) => {
                if (key === 'label') return false
                const currentValue = currentProps[key as keyof typeof currentProps]
                return value !== currentValue
            })

            const hasLabelChange = values.label !== currentLabel

            if (hasStyleChanges) {
                const updatedProps = {
                    ...currentProps,
                    ...Object.fromEntries(
                        Object.entries(values).filter(([key]) => key !== 'label')
                    )
                }
                updateChildElementProperties(
                    selectedChildElement.element.id,
                    selectedChildElement.parentId,
                    { props: updatedProps }
                )
            }

            if (hasLabelChange) {
                updateChildElementProperties(
                    selectedChildElement.element.id,
                    selectedChildElement.parentId,
                    { label: values.label }
                )
            }
        }, 300),
        [selectedChildElement, updateChildElementProperties]
    )



    const handleDelete = () => {
        if (!selectedChildElement) return
        deleteChildElement(selectedChildElement.element.id, selectedChildElement.parentId)
        // Clear the selection after deletion
        useStore.getState().selectChildElement(null)
    }

    // Reset form when selected child element changes
    React.useEffect(() => {
        if (selectedChildElement) {
            const currentLabel = selectedChildElement.element.label || "Button"
            const currentStyle = selectedChildElement.element.props || {}

            setValue('label', currentLabel)
            setValue('backgroundColor', String(currentStyle.backgroundColor || '#3b82f6'))
            setValue('color', String(currentStyle.color || '#ffffff'))
            setValue('fontSize', String(currentStyle.fontSize || '16px'))
            setValue('padding', String(currentStyle.padding || '8px 16px'))
            setValue('borderRadius', String(currentStyle.borderRadius || '4px'))
            setValue('fontWeight', String(currentStyle.fontWeight || '500'))
        }
    }, [selectedChildElement, setValue])

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
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Button Properties</h3>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                >
                    Delete
                </button>
            </div>

            <form className="space-y-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Button Text</label>
                    <input
                        {...register("label", {
                            required: "Button text is required",
                            minLength: {
                                value: 1,
                                message: "Button text must be at least 1 character"
                            }
                        })}
                        type="text"
                        className={`w-full p-2 border rounded ${errors.label ? 'border-red-500' : ''}`}
                    />
                    {errors.label && (
                        <p className="text-red-500 text-xs mt-1">{errors.label.message}</p>
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
                    <label className="block text-sm font-medium mb-1">Text Color</label>
                    <input
                        {...register("color")}
                        type="color"
                        className="w-full p-1 border rounded h-10"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Font Size</label>
                    <input
                        {...register("fontSize", {
                            pattern: {
                                value: /^(\d+(\.\d+)?(px|rem|em|%)?)$/,
                                message: "Invalid font size format (e.g., 16px, 1rem)"
                            }
                        })}
                        type="text"
                        className={`w-full p-2 border rounded ${errors.fontSize ? 'border-red-500' : ''}`}
                        placeholder="e.g., 16px, 1rem"
                    />
                    {errors.fontSize && (
                        <p className="text-red-500 text-xs mt-1">{errors.fontSize.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Padding</label>
                    <input
                        {...register("padding", {
                            pattern: {
                                value: /^(\d+(\.\d+)?(px|rem|em|%)?\s*)+$/,
                                message: "Invalid padding format (e.g., 8px 16px)"
                            }
                        })}
                        type="text"
                        className={`w-full p-2 border rounded ${errors.padding ? 'border-red-500' : ''}`}
                        placeholder="e.g., 8px 16px"
                    />
                    {errors.padding && (
                        <p className="text-red-500 text-xs mt-1">{errors.padding.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Border Radius</label>
                    <input
                        {...register("borderRadius", {
                            pattern: {
                                value: /^(\d+(\.\d+)?(px|rem|em|%)?\s*)+$/,
                                message: "Invalid border radius format (e.g., 4px, 8px)"
                            }
                        })}
                        type="text"
                        className={`w-full p-2 border rounded ${errors.borderRadius ? 'border-red-500' : ''}`}
                        placeholder="e.g., 4px, 8px"
                    />
                    {errors.borderRadius && (
                        <p className="text-red-500 text-xs mt-1">{errors.borderRadius.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Font Weight</label>
                    <select
                        {...register("fontWeight")}
                        className="w-full p-2 border rounded"
                    >
                        <option value="300">Light (300)</option>
                        <option value="400">Normal (400)</option>
                        <option value="500">Medium (500)</option>
                        <option value="600">Semi Bold (600)</option>
                        <option value="700">Bold (700)</option>
                    </select>
                </div>
            </form>
        </div>
    )
}