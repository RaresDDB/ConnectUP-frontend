import { Severity } from '../enums/severity-enums';
import { RootState } from '../store';

export interface MessagePayload {
    message: string,
    severity: Severity
}

export interface ErrorResponsePayload extends MessagePayload {
}

export type ThunkConfig = {
    state: RootState;
    rejectValue: ErrorResponsePayload;
};