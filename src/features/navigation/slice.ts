import { initialState } from './state';
import { NavigateAction } from './types';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        navigate: (state, action: PayloadAction<NavigateAction>) => {
            state.url = action.payload.url;
            state.params = action.payload.params;
            state.replace = action.payload.replace;
        },
        reset: (state) => {
            state.url = null;
        }
    }
})

export const { navigate, reset } = navigationSlice.actions;
export default navigationSlice.reducer;