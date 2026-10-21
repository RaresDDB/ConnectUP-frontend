import { initialState } from './state';
import { ToastrAction } from './types';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'

export const toastrSlice = createSlice({
    name: 'toastr',
    initialState,
    reducers: {
        showToastr: (state, { payload }: PayloadAction<ToastrAction>) => {
            state.open = true;
            state.message = payload.message;
            state.severity = payload.severity;
        },
        hideToastr: (state) => {
            state.open = false;
        },
        resetToastr: (state) => {
            state.open = false;
            state.message = null;
            state.severity = null;
        }
    }
})

export const { hideToastr, resetToastr, showToastr } = toastrSlice.actions;
export default toastrSlice.reducer;