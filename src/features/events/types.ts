import { Status } from "../../enums/status-enums";
import { Severity } from "../../enums/severity-enums";
import { MessagePayload } from "../../types/features-types";
import { EventsFunctionality } from "./enums";
import type {
    Event,
    MemberEvent,
    AttendanceStats
} from "../../types/event-types";

export interface EventsState {
    event: (Event & { attendanceStats: AttendanceStats }) | null,
    events: (Event | MemberEvent)[],
    messages: Record<EventsFunctionality, string | null>,
    statuses: Record<EventsFunctionality, Status | null>,
    severities: Record<EventsFunctionality, Severity | null>
}

export interface CreateRequestPayload {
    title: string;
    hostId: string;
    startDate: string;
    endDate: string;
    tags: string[];
    description: string;
    image: File;
    gallery: File[];
    marker: google.maps.LatLngLiteral;
    isPaid: boolean;
    price: number;
    currency: string;
    maxAttendees: number;
}

export interface CreateResponsePayload extends MessagePayload {
    event: Event;
}

export interface AttendRequestPayload {
    id: string;
}

export interface UnattendRequestPayload {
    id: string;
}

export interface AddEventToFavoritesRequestPayload {
    id: string;
}

export interface RemoveEventFromFavoritesRequestPayload {
    id: string;
}

export interface AttendResponsePayload extends MessagePayload { }

export interface UnattendResponsePayload extends MessagePayload { }

export interface AddEventToFavoritesResponsePayload extends MessagePayload { }

export interface RemoveEventFromFavoritesResponsePayload extends MessagePayload { }

export interface GetByIdRequestPayload {
    id: string;
}

export interface GetNearbyRequestPayload {
    lat: number,
    lng: number,
    radius: number
}

export interface GetAllResponsePayload {
    events: Event[];
}

export interface GetByIdResponsePayload extends Event { }

export interface GetNearbyResponsePayload {
    events: Event[];
}

export interface DeleteByIdRequestPayload {
    id: string;
}

export interface DeleteByIdResponsePayload extends MessagePayload { }