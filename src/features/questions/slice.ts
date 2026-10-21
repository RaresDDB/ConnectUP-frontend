import initialState from './state';
import { Status } from '../../enums/status-enums';
import { QuestionsState } from './types';
import { QuestionsFunctionality } from './enums';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import * as thunks from './thunks';

const createStatusHandlers = (functionality: QuestionsFunctionality) => ({
    pending: (state: QuestionsState) => {
        state.statuses[functionality] = Status.Pending;
    },
    fulfilled: (state: QuestionsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Fulfilled;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;
    },
    rejected: (state: QuestionsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Rejected;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;
    }
});

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        reset: (state, { payload }: PayloadAction<QuestionsFunctionality>) => {
            state.messages[payload] = null;
            state.statuses[payload] = null;
            state.severities[payload] = null;
        }
    },
    extraReducers: (builder) => {
        Object.values(QuestionsFunctionality).forEach(functionality => {
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

export const { reset } = questionsSlice.actions;
export default questionsSlice.reducer;