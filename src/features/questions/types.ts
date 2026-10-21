import { Status } from "../../enums/status-enums";
import { Severity } from "../../enums/severity-enums";
import { MessagePayload } from "../../types/features-types";
import { QuestionsFunctionality } from "./enums";
import type { Question } from "../../types/question-types";

export interface QuestionsState {
    messages: Record<QuestionsFunctionality, string | null>,
    statuses: Record<QuestionsFunctionality, Status | null>,
    severities: Record<QuestionsFunctionality, Severity | null>
}

export interface CreateRequestPayload {
    title: string;
    text: string;
    eventId: string;
    mentionedUsernames: string[];
}

export interface CreateResponsePayload extends MessagePayload {
    question: Question;
}