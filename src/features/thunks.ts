import TypeUtils from "../utils/type-utils";
import { ERRORS } from "../constants/error-constants";
import { Severity } from "../enums/severity-enums";
import { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ThunkConfig,
    ErrorResponsePayload
} from "../types/features-types";

export const createThunk = <Response, Request = void>(
    typePrefix: string,
    handler: (
        requestPayload: Request,
        thunkAPI: {
            getState: () => RootState,
            rejectWithValue: (error: ErrorResponsePayload) => any
        }) => Promise<Response>
) => {
    return createAsyncThunk<Response, Request, ThunkConfig>(
        typePrefix,
        async (requestPayload, thunkAPI) => {
            try {
                return await handler(requestPayload, thunkAPI);
            }
            catch (error: unknown) {
                if (TypeUtils.isErrorResponsePayload(error)) {
                    return thunkAPI.rejectWithValue({
                        message: error.message,
                        severity: error.severity
                    });
                }

                return thunkAPI.rejectWithValue({
                    message: error instanceof Error ? error.message : ERRORS.general.unknown,
                    severity: Severity.Error
                });
            }
        }
    );
};
