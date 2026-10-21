import { Event } from "../../../types/event-types"
import { Position } from "../../../types/position-types"

export interface EventsMapProps {
    events: Event[]
    mapCenter: Position
}