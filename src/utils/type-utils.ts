import { ErrorResponsePayload } from "../types/features-types";

class TypeUtils {
    public static initRecord = <T extends string, U>(keys: T[], defaultValue: U): Record<T, U> => {
        const record: Partial<Record<T, U>> = {};
        for (const key of keys) {
            record[key] = defaultValue;
        }
        return record as Record<T, U>;
    }

    public static isErrorResponsePayload = (error: unknown): error is ErrorResponsePayload => {
        return (
            !!error &&
            typeof error === 'object' &&
            'message' in error &&
            'severity' in error &&
            typeof error.message === 'string' &&
            typeof error.severity === 'string'
        );
    };
}

export default TypeUtils;