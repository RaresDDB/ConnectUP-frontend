import TypeUtils from "../../utils/type-utils";
import { MembersState } from "./types";
import { MembersFunctionality } from "./enums";

const initialState: MembersState = {
    members: [],
    messages: TypeUtils.initRecord(Object.values(MembersFunctionality), null),
    statuses: TypeUtils.initRecord(Object.values(MembersFunctionality), null),
    severities: TypeUtils.initRecord(Object.values(MembersFunctionality), null)
}

export default initialState;