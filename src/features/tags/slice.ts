import initialState from './state';
import { Status } from '../../enums/status-enums';
import { TagsFunctionality } from './enums';
import {
    TagsState,
    GetAllResponsePayload
} from './types';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import * as thunks from './thunks';

const stateUpdates = {
    getAllTags: (state: TagsState, payload: GetAllResponsePayload) => {
        state.tags = payload.tags;
    }
} as const;

const createStatusHandlers = (functionality: TagsFunctionality) => ({
    pending: (state: TagsState) => {
        state.statuses[functionality] = Status.Pending;
    },
    fulfilled: (state: TagsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Fulfilled;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;

        const stateUpdate = stateUpdates[functionality];

        if (stateUpdate) {
            stateUpdate(state, payload);
        }
    },
    rejected: (state: TagsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Rejected;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;
    }
});

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        reset: (state, { payload }: PayloadAction<TagsFunctionality>) => {
            state.messages[payload] = null;
            state.statuses[payload] = null;
            state.severities[payload] = null;
        }
    },
    extraReducers: (builder) => {
        Object.values(TagsFunctionality).forEach(functionality => {
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

export const { reset } = tagsSlice.actions;
export default tagsSlice.reducer;