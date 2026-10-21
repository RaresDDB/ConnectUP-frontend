import { User } from '../../types/user-types';
import { Status } from '../../enums/status-enums';
import { Severity } from '../../enums/severity-enums';
import { MessagePayload } from '../../types/features-types';
import { AuthFunctionality } from './enums';

export interface AuthState {
    user: User | null,
    messages: Record<AuthFunctionality, string | null>,
    statuses: Record<AuthFunctionality, Status | null>,
    severities: Record<AuthFunctionality, Severity | null>
}

export interface RegisterRequestPayload {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    birthDate: Date,
    gender: string,
    tags: string[],
    avatar: File | null
}

export interface LoginRequestPayload {
    email: string;
    password: string;
}

export interface ActivateRequestPayload {
    token: string
}

export interface ForgotPasswordRequestPayload {
    email: string
}

export interface ResetPasswordRequestPayload {
    token: string,
    newPassword: string
}

export interface UpdateRequestPayload {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    birthDate: Date,
    gender: string,
    tags: string[],
    avatar: File | null
}

export interface ChangeEmailRequestPayload {
    newEmail: string
}

export interface ChangePasswordRequestPayload {
    newPassword: string,
    currentPassword: string
}

export interface ConfirmChangeEmailRequestPayload {
    token: string
}

export interface ConfirmChangePasswordRequestPayload {
    token: string
}

export interface RegisterResponsePayload extends MessagePayload {
}

export interface LoginResponsePayload extends MessagePayload { }

export interface GetLoggedUserResponsePayload extends User { }

export interface ActivateResponsePayload extends MessagePayload {
}

export interface ForgotPasswordResponsePayload extends MessagePayload {
}

export interface ResetPasswordResponsePayload extends MessagePayload {
}

export interface UpdateResponsePayload extends MessagePayload {
    user: User
}

export interface ChangeEmailResponsePayload extends MessagePayload {
    user: User
}

export interface ChangePasswordResponsePayload extends MessagePayload {
}

export interface ConfirmChangeEmailResponsePayload extends MessagePayload {
    newEmail: string
}

export interface ConfirmChangePasswordResponsePayload extends MessagePayload {
}

export interface LogoutResponsePayload extends MessagePayload {
}