import { Event } from "../../../types/event-types"
import { Position } from "../../../types/position-types"

export interface ManageEventsMapProps {
    events: Event[],
    mapCenter: Position
}