import { Status } from "../../enums/status-enums";
import { Severity } from "../../enums/severity-enums";
import { MessagePayload } from "../../types/features-types";
import { ReviewsFunctionality } from "./enums";
import type { Review } from "../../types/review-types";

export interface ReviewsState {
    messages: Record<ReviewsFunctionality, string | null>,
    statuses: Record<ReviewsFunctionality, Status | null>,
    severities: Record<ReviewsFunctionality, Severity | null>
}

export interface CreateRequestPayload {
    title: string;
    text: string;
    rating: number;
    eventId: string;    
}

export interface CreateResponsePayload extends MessagePayload {
    review: Review;
}