import TypeUtils from "../../utils/type-utils";
import { EventsState } from "./types";
import { EventsFunctionality } from "./enums";

const initialState: EventsState = {
    event: null,
    events: [],
    messages: TypeUtils.initRecord(Object.values(EventsFunctionality), null),
    statuses: TypeUtils.initRecord(Object.values(EventsFunctionality), null),
    severities: TypeUtils.initRecord(Object.values(EventsFunctionality), null)
}

export default initialState;