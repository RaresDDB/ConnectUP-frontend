import * as thunks from './thunks';
import initialState from './state';
import { Status } from '../../enums/status-enums';
import { GeocodingFunctionality } from './enums';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import type {
    GeocodingState,
    GetCoordsByAddressResponsePayload
} from './types';

const stateUpdates = {
    getCoordsByAddress: (state: GeocodingState, payload: GetCoordsByAddressResponsePayload) => {
        state.lat = parseFloat(payload.lat);
        state.lng = parseFloat(payload.lng);
    }
} as const;

const createStatusHandlers = (functionality: GeocodingFunctionality) => ({
    pending: (state: GeocodingState) => {
        state.statuses[functionality] = Status.Pending;
    },
    fulfilled: (state: GeocodingState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Fulfilled;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;

        const stateUpdate = stateUpdates[functionality];

        if (stateUpdate) {
            stateUpdate(state, payload);
        }
    },
    rejected: (state: GeocodingState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Rejected;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;
    }
});

export const geocodingSlice = createSlice({
    name: 'geocoding',
    initialState,
    reducers: {
        reset: (state, { payload }: PayloadAction<GeocodingFunctionality>) => {
            state.messages[payload] = null;
            state.statuses[payload] = null;
            state.severities[payload] = null;
        }
    },
    extraReducers: (builder) => {
        Object.values(GeocodingFunctionality).forEach(functionality => {
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

export const { reset } = geocodingSlice.actions;
export default geocodingSlice.reducer;