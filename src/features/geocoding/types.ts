import { Status } from "../../enums/status-enums";
import { Severity } from "../../enums/severity-enums";
import { GeocodingFunctionality } from "./enums";

export interface GeocodingState {
    lat: number | null,
    lng: number | null,
    messages: Record<GeocodingFunctionality, string | null>,
    statuses: Record<GeocodingFunctionality, Status | null>,
    severities: Record<GeocodingFunctionality, Severity | null>
}

export interface GetCoordsByAddressRequestPayload {
    address: string
}

export interface GetCoordsByAddressResponsePayload {
    lat: string,
    lng: string
}