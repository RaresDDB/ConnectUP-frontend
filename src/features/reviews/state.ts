import TypeUtils from "../../utils/type-utils";
import { ReviewsState } from "./types";
import { ReviewsFunctionality } from "./enums";

const initialState: ReviewsState = {
    messages: TypeUtils.initRecord(Object.values(ReviewsFunctionality), null),
    statuses: TypeUtils.initRecord(Object.values(ReviewsFunctionality), null),
    severities: TypeUtils.initRecord(Object.values(ReviewsFunctionality), null)
}

export default initialState;