import initialState from './state';
import { Status } from '../../enums/status-enums';
import { MembersFunctionality } from './enums';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import {
    MembersState,
    GetAllResponsePayload
} from './types';
import * as thunks from './thunks';

const stateUpdates = {
    getAllMembers: (state: MembersState, payload: GetAllResponsePayload) => {
        state.members = payload.members;
    }
} as const;

const createStatusHandlers = (functionality: MembersFunctionality) => ({
    pending: (state: MembersState) => {
        state.statuses[functionality] = Status.Pending;
    },
    fulfilled: (state: MembersState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Fulfilled;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;

        const stateUpdate = stateUpdates[functionality];

        if (stateUpdate) {
            stateUpdate(state, payload);
        }
    },
    rejected: (state: MembersState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Rejected;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;
    }
});

export const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        reset: (state, { payload }: PayloadAction<MembersFunctionality>) => {
            state.messages[payload] = null;
            state.statuses[payload] = null;
            state.severities[payload] = null;
        }
    },
    extraReducers: (builder) => {
        Object.values(MembersFunctionality).forEach(functionality => {
            const handlers = createStatusHandlers(functionality);

            const thunk = thunks[functionality];

            if (thunk) {
                builder
                    .addCase(thunk.pending, handlers.pending)
                    .addCase(thunk.fulfilled, handlers.fulfilled)
                    .addCase(thunk.rejected, handlers.rejected);
            }
        })
    }
});

export const { reset } = membersSlice.actions;
export default membersSlice.reducer;