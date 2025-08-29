import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ElementProps } from '../elements/element'
import { IChildren } from '../elements/element.type'

interface IStoreState {
    elements: ElementProps[]
    selectedElement: ElementProps | null
    selectedChildElement: { element: IChildren; parentId: string } | null
    setElements: (element: ElementProps) => void
    updateElements: (element: ElementProps, id: string) => void
    addElementToCanvas: (element: ElementProps) => void
    selectElement: (element: ElementProps | null) => void
    selectChildElement: (childElement: IChildren | null, parentId?: string) => void
    updateElementProperties: (id: string, properties: Partial<ElementProps>) => void
    updateChildElementProperties: (childId: string, parentId: string, properties: Partial<IChildren>) => void
    deleteElement: (id: string) => void
    deleteChildElement: (childId: string, parentId: string) => void
}

export const useStore = create<IStoreState>()(
    devtools(
        /* persist( */
        (set, get) => ({
            elements: [],
            selectedElement: null,
            selectedChildElement: null,
            setElements: (element) => set({ elements: [...get().elements, element] }),
            addElementToCanvas: (element) => set({ elements: [...get().elements, element] }),
            selectElement: (element) => set({ selectedElement: element, selectedChildElement: null }),
            selectChildElement: (childElement, parentId) => set({
                selectedChildElement: childElement ? { element: childElement, parentId: parentId || '' } : null,
                selectedElement: null
            }),
            deleteElement: (id) => {
                const deleteElementFromTree = (elements: ElementProps[]): ElementProps[] => {
                    return elements.filter(el => el.id !== id)
                }

                set({
                    elements: deleteElementFromTree(get().elements),
                    selectedElement: null,
                    selectedChildElement: null
                })
            },
            updateElementProperties: (id, properties) => {
                const updateElementInTree = (elements: ElementProps[]): ElementProps[] => {
                    return elements.map(el => {
                        if (el.id === id) {
                            return { ...el, ...properties }
                        }
                        if (el.children && el.children.length > 0) {
                            return {
                                ...el,
                                children: el.children.map(child => {
                                    if (child.id === id) {
                                        return {
                                            ...child,
                                            props: { ...child.props, ...properties.style }
                                        }
                                    }
                                    return child
                                })
                            }
                        }
                        return el
                    })
                }

                set({
                    elements: updateElementInTree(get().elements)
                })
            },
            updateChildElementProperties: (childId, parentId, properties) => {
                const updateChildInTree = (elements: ElementProps[]): ElementProps[] => {
                    return elements.map(el => {
                        if (el.id === parentId && el.children) {
                            return {
                                ...el,
                                children: el.children.map(child => {
                                    if (child.id === childId) {
                                        return { ...child, ...properties }
                                    }
                                    return child
                                })
                            }
                        }
                        return el
                    })
                }

                set({
                    elements: updateChildInTree(get().elements)
                })
            },
            deleteChildElement: (childId, parentId) => {
                const deleteChildFromTree = (elements: ElementProps[]): ElementProps[] => {
                    return elements.map(el => {
                        if (el.id === parentId && el.children) {
                            return {
                                ...el,
                                children: el.children.filter(child => child.id !== childId)
                            }
                        }
                        return el
                    })
                }

                set({
                    elements: deleteChildFromTree(get().elements),
                    selectedChildElement: null
                })
            },
            updateElements: (element, id) => {
                const addElementToChildren = (elements: ElementProps[], targetId: string): ElementProps[] => {
                    return elements.map(el => {
                        if (el.id === targetId) {
                            // Convert ElementProps to IChildren format
                            const childElement: IChildren = {
                                id: element.id as string,
                                type: element.type,
                                props: element.style,
                                label: element.extraAttributes?.label || "Button"
                            }
                            return {
                                ...el,
                                children: [...el.children, childElement]
                            }
                        }
                        if (el.children && el.children.length > 0) {
                            // For nested children, we need to handle them differently
                            // Since children are IChildren[], we can't recursively call this function
                            // This is a limitation of the current structure
                            return el
                        }
                        return el
                    })
                }

                set({
                    elements: addElementToChildren(get().elements, id)
                })
            }
        }),
        /*    {
               name: 'drag-drop-element',
               storage: createJSONStorage(() => localStorage),
           } */
    ),
    // { name: 'DragAndDropBuilder' }
)
