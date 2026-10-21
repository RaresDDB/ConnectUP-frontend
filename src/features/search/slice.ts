import { SearchData } from './types';
import { initialState } from './state';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search: (state, { payload }: PayloadAction<SearchData>) => {
            state.location = payload.location;
        },
        reset: (state) => {
            state.location = '';
        }
    }
})

export const { search, reset } = searchSlice.actions;
export default searchSlice.reducer;