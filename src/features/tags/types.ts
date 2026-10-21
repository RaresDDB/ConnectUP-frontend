import { Status } from "../../enums/status-enums";
import { Severity } from "../../enums/severity-enums";
import { TagsFunctionality } from "./enums";
import type { Tag } from "../../types/tag-types";

export interface TagsState {
    tags: Tag[],
    messages: Record<TagsFunctionality, string | null>,
    statuses: Record<TagsFunctionality, Status | null>,
    severities: Record<TagsFunctionality, Severity | null>
}

export interface GetAllResponsePayload {
    tags: Tag[]
}