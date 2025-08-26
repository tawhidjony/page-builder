
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"


export const usePlugin = () => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, //px
        }
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300, //ms
            tolerance: 5 //px
        }
    })

    const sensors = useSensors(mouseSensor, touchSensor)
    return { sensors }
}

