import * as thunks from './thunks';
import initialState from './state';
import { Status } from '../../enums/status-enums';
import { ERRORS } from '../../constants/error-constants';
import { Severity } from '../../enums/severity-enums';
import { AuthFunctionality } from './enums';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import type {
    AuthState,
    UpdateResponsePayload,
    GetLoggedUserResponsePayload,
    ConfirmChangeEmailResponsePayload
} from './types';

const stateUpdates = {
    register: () => { },
    activate: () => { },
    changeEmail: () => { },
    resetPassword: () => { },
    changePassword: () => { },
    forgotPassword: () => { },
    confirmChangePassword: () => { },
    login: (state: AuthState, payload: { user: GetLoggedUserResponsePayload }) => {
        state.user = payload.user;
    },
    logout: (state: AuthState) => {
        state.user = null;
    },
    updateById: (state: AuthState, payload: UpdateResponsePayload) => {
        state.user = payload.user;
    },
    confirmChangeEmail: (state: AuthState, payload: ConfirmChangeEmailResponsePayload) => {
        if (state.user) {
            state.user.email = payload.newEmail;
        }
    }
} as const;

const createStatusHandlers = (functionality: AuthFunctionality) => ({
    pending: (state: AuthState) => {
        state.statuses[functionality] = Status.Pending;
    },
    fulfilled: (state: AuthState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Fulfilled;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;

        const stateUpdate = stateUpdates[functionality];

        if (stateUpdate) {
            stateUpdate(state, payload);
        }
    },
    rejected: (state: AuthState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Rejected;
        state.messages[functionality] = payload.message ?? ERRORS.general.unknown;
        state.severities[functionality] = payload.severity ?? Severity.Error;
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state, { payload }: PayloadAction<AuthFunctionality>) => {
            state.messages[payload] = null;
            state.statuses[payload] = null;
            state.severities[payload] = null;
        }
    },
    extraReducers: (builder) => {
        Object.values(AuthFunctionality).forEach(functionality => {
            const handlers = createStatusHandlers(functionality);

            const thunk = thunks[functionality];

            if (thunk) {
                builder
                    .addCase(thunk.pending, handlers.pending)
                    .addCase(thunk.fulfilled, handlers.fulfilled)
                    .addCase(thunk.rejected, handlers.rejected);
            }
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;