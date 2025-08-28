import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { ElementProps } from '../elements/element'

interface IStoreState {
    elements: ElementProps[]
    setElements: (element: ElementProps) => void
    updateElements: (element: ElementProps, id: string) => void
}

export const useStore = create<IStoreState>()(
    devtools(
        persist(
            (set, get) => ({
                elements: [],
                setElements: (element) => set({ elements: [...get().elements, element] }),
                updateElements: (element, id) => {
                    set({
                        elements: get().elements.map(el =>
                            el.id === id
                                ? {
                                    ...el,
                                    children: [...el.children, element] as typeof el.children
                                }
                                : el
                        )
                    })
                }
            }),
            {
                name: 'drag-drop-element',
                storage: createJSONStorage(() => localStorage),
            }
        ),
        { name: 'DragAndDropBuilder' }
    )
)