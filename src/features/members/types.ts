import { Status } from "../../enums/status-enums";
import { Member } from "../../types/member-types";
import { Severity } from "../../enums/severity-enums";
import { MembersFunctionality } from "./enums";

export interface MembersState {
    members: Member[],
    messages: Record<MembersFunctionality, string | null>,
    statuses: Record<MembersFunctionality, Status | null>,
    severities: Record<MembersFunctionality, Severity | null>
}

export interface GetAllResponsePayload {
    members: Member[]
}