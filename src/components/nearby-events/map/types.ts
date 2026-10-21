import { Event } from "../../../types/event-types"
import { Position } from "../../../types/position-types"

export interface NearbyEventsMapProps {
    events: Event[]
    radius: number;
    setRadius: (radius: number) => void;
    mapCenter: Position,
    circleCenter: Position,
    setCircleCenter: (circleCenter: Position) => void;
}