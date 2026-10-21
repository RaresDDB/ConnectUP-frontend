import TypeUtils from "../../utils/type-utils";
import { GeocodingState } from "./types";
import { GeocodingFunctionality } from "./enums";

const initialState: GeocodingState = {
    lat: null,
    lng: null,
    messages: TypeUtils.initRecord(Object.values(GeocodingFunctionality), null),
    statuses: TypeUtils.initRecord(Object.values(GeocodingFunctionality), null),
    severities: TypeUtils.initRecord(Object.values(GeocodingFunctionality), null)
}

export default initialState;