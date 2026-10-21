import { reset } from './slice';
import { Status } from '../../enums/status-enums';
import { useEffect } from 'react';
import { AuthFunctionality } from './enums';
import {
    logout,
    activate,
    confirmChangeEmail,
    confirmChangePassword,
} from './thunks';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';

const useReset = (
    functionality: AuthFunctionality,
    shouldReset: boolean
): void => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (shouldReset) {
            console.log(`[Debug] Resetting ${functionality}`);
            dispatch(reset(functionality));
        }
    }, [functionality, shouldReset, dispatch]);
};

const useStatus = (func: AuthFunctionality) => {
    const status = useAppSelector((state) => state.auth.statuses[func]);
    const message = useAppSelector((state) => state.auth.messages[func]);
    const severity = useAppSelector((state) => state.auth.severities[func]);

    const isError = status === Status.Rejected;
    const isLoading = status === Status.Pending;
    const isSuccess = status === Status.Fulfilled;

    return { isLoading, isError, isSuccess, message, severity };
};

export const useRegister = () => {
    const { isLoading, isSuccess, isError } = useStatus(AuthFunctionality.Register);

    useReset(AuthFunctionality.Register, isSuccess || isError);

    return { isLoading };
};

export const useActivate = (token: string | null) => {
    const dispatch = useAppDispatch();

    const { isLoading, isSuccess, isError } = useStatus(AuthFunctionality.Activate);

    useEffect(() => {
        if (token) {
            dispatch(activate({ token }));
        }
    }, [token]);

    useReset(AuthFunctionality.Activate, isSuccess || isError);

    return { isLoading };
}

export const useLogin = () => {
    const { isLoading, isSuccess, isError } = useStatus(AuthFunctionality.Login);

    useReset(AuthFunctionality.Login, isSuccess || isError);

    return { isLoading };
};

export const useForgotPassword = () => {
    const { isLoading, isSuccess, isError } = useStatus(AuthFunctionality.ForgotPassword);

    useReset(AuthFunctionality.ForgotPassword, isSuccess || isError);

    return { isLoading };
};

export const useResetPassword = () => {
    const { isLoading, isSuccess, isError } = useStatus(AuthFunctionality.ResetPassword);

    useReset(AuthFunctionality.ResetPassword, isSuccess || isError);

    return { isLoading };
};

export const useLogout = () => {
    const dispatch = useAppDispatch();

    const { isLoading, isSuccess, isError } = useStatus(AuthFunctionality.Logout);

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    useReset(AuthFunctionality.Logout, isSuccess || isError);

    return { isLoading };
}

export const useUpdateById = () => {
    const { isLoading } = useStatus(AuthFunctionality.UpdateById);
    return { isLoading };
}

export const useChangeEmail = () => {
    const { isLoading } = useStatus(AuthFunctionality.ChangeEmail);
    return { isLoading };
}

export const useChangePassword = () => {
    const { isLoading } = useStatus(AuthFunctionality.ChangePassword);
    return { isLoading };
}

export const useConfirmChangeEmail = (token: string | null) => {
    const dispatch = useAppDispatch();

    const { isLoading } = useStatus(AuthFunctionality.ConfirmChangeEmail);

    useEffect(() => {
        if (token) {
            dispatch(confirmChangeEmail({ token }));
        }
    }, [dispatch]);

    return { isLoading };
}

export const useConfirmChangePassword = (token: string | null) => {
    const dispatch = useAppDispatch();

    const { isLoading } = useStatus(AuthFunctionality.ConfirmChangePassword);

    useEffect(() => {
        if (token) {
            dispatch(confirmChangePassword({ token }));
        }
    }, [dispatch]);

    return { isLoading };
}