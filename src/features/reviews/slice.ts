import initialState from './state';
import { Status } from '../../enums/status-enums';
import { ReviewsState } from './types';
import { ReviewsFunctionality } from './enums';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import * as thunks from './thunks';

const createStatusHandlers = (functionality: ReviewsFunctionality) => ({
    pending: (state: ReviewsState) => {
        state.statuses[functionality] = Status.Pending;
    },
    fulfilled: (state: ReviewsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Fulfilled;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;
    },
    rejected: (state: ReviewsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Rejected;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;
    }
});

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        reset: (state, { payload }: PayloadAction<ReviewsFunctionality>) => {
            state.messages[payload] = null;
            state.statuses[payload] = null;
            state.severities[payload] = null;
        }
    },
    extraReducers: (builder) => {
        Object.values(ReviewsFunctionality).forEach(functionality => {
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

export const { reset } = reviewsSlice.actions;
export default reviewsSlice.reducer;