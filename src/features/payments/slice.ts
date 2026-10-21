import initialState from './state';
import { Status } from '../../enums/status-enums';
import { PaymentsFunctionality } from './enums';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import {
    PaymentsState,
    CreateResponsePayload
} from './types';
import * as thunks from './thunks';

const stateUpdates = {
    createPayment: (state: PaymentsState, payload: CreateResponsePayload) => {
        state.clientSecret = payload.clientSecret;
    }
}

const createStatusHandlers = (functionality: PaymentsFunctionality) => ({
    pending: (state: PaymentsState) => {
        state.statuses[functionality] = Status.Pending;
    },
    fulfilled: (state: PaymentsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Fulfilled;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;

        const stateUpdate = stateUpdates[functionality];

        if (stateUpdate) {
            stateUpdate(state, payload);
        }
    },
    rejected: (state: PaymentsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Rejected;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;
    }
});

export const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        reset: (state, { payload }: PayloadAction<PaymentsFunctionality>) => {
            state.messages[payload] = null;
            state.statuses[payload] = null;
            state.severities[payload] = null;
        }
    },
    extraReducers: (builder) => {
        Object.values(PaymentsFunctionality).forEach(functionality => {
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

export const { reset } = paymentsSlice.actions;
export default paymentsSlice.reducer;