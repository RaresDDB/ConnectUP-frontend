import TypeUtils from "../../utils/type-utils";
import { TagsState } from "./types";
import { TagsFunctionality } from "./enums";

const initialState: TagsState = {
    tags: [],
    messages: TypeUtils.initRecord(Object.values(TagsFunctionality), null),
    statuses: TypeUtils.initRecord(Object.values(TagsFunctionality), null),
    severities: TypeUtils.initRecord(Object.values(TagsFunctionality), null)
}

export default initialState;