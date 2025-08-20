"use client"
import React, { createContext, useContext, useState } from "react";

type DragDropLayoutElementContext<T = unknown> = {
    dragElementLayout: T | null;
    setDragElementLayout: React.Dispatch<React.SetStateAction<T | null>>;

    emailTemplete: T | null;
    setEmailTemplete: React.Dispatch<React.SetStateAction<T[] | null>>;

    selectedElement: T | null;
    setSelectedElement: React.Dispatch<React.SetStateAction<T[] | null>>;
};

const DragDropLayoutElement = createContext<DragDropLayoutElementContext | undefined>(undefined);

export const DragDropLayoutElementProvider = ({ children }: { children: React.ReactNode }) => {
    const [dragElementLayout, setDragElementLayout] = useState<unknown | null>(null);
    const [selectedElement, setSelectedElement] = useState<unknown | null>(null);
    const [emailTemplete, setEmailTemplete] = useState<unknown[] | null>([]);

    return (
        <DragDropLayoutElement.Provider value={{
            dragElementLayout,
            setDragElementLayout,

            emailTemplete,
            setEmailTemplete,

            selectedElement,
            setSelectedElement
        }}>
            {children}
        </DragDropLayoutElement.Provider>
    );
};

export const useDragDropLayoutElement = () => {
    const context = useContext(DragDropLayoutElement);
    if (!context) {
        throw new Error("useDragDropLayoutElement must be used within a DragDropLayoutElementProvider");
    }
    return context;
};
