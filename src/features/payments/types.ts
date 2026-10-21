import { Status } from "../../enums/status-enums";
import { Severity } from "../../enums/severity-enums";
import { MessagePayload } from "../../types/features-types";
import { PaymentsFunctionality } from "./enums";

export interface PaymentsState {
    clientSecret: string | null;
    messages: Record<PaymentsFunctionality, string | null>,
    statuses: Record<PaymentsFunctionality, Status | null>,
    severities: Record<PaymentsFunctionality, Severity | null>
}

export interface CreateRequestPayload {
    amount: number;
    currency: string;
}

export interface CreateResponsePayload extends MessagePayload { 
    clientSecret: string;
}