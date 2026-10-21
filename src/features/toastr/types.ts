import { Severity } from "../../enums/severity-enums";

export interface ToastrAction {
    message: string | null,
    severity: Severity | null
}

export interface ToastrState {
    open: boolean,
    message: string | null,
    severity: Severity | null
}