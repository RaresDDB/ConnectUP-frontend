import { authService } from './service';
import { createThunk } from '../thunks';
import type {
    LoginRequestPayload,
    UpdateRequestPayload,
    RegisterRequestPayload,
    ActivateRequestPayload,
    ChangeEmailRequestPayload,
    ResetPasswordRequestPayload,
    ForgotPasswordRequestPayload,
    ChangePasswordRequestPayload,
    ConfirmChangeEmailRequestPayload,
    ConfirmChangePasswordRequestPayload
} from './types';

export const register = createThunk(
    'auth/register',
    async (requestPayload: RegisterRequestPayload) => {
        return authService.register(requestPayload);
    }
);

export const activate = createThunk(
    'auth/activate',
    async (requestPayload: ActivateRequestPayload) => {
        return authService.activate(requestPayload);
    }
);

export const login = createThunk(
    'auth/login',
    async (requestPayload: LoginRequestPayload) => {
        const loginResponsePayload = await authService.login(requestPayload);
        const userResponsePayload = await authService.getLoggedUser();

        localStorage.setItem('user', JSON.stringify(userResponsePayload));

        return {
            ...loginResponsePayload,
            user: userResponsePayload
        };
    }
);

export const updateById = createThunk(
    'api/users/updateById',
    async (requestPayload: UpdateRequestPayload) => {
        const response = await authService.updateById(requestPayload);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
    }
);

export const forgotPassword = createThunk(
    'auth/forgotPassword',
    async (requestPayload: ForgotPasswordRequestPayload) => {
        return authService.forgotPassword(requestPayload);
    }
);

export const resetPassword = createThunk(
    'auth/resetPassword',
    async (requestPayload: ResetPasswordRequestPayload) => {
        return authService.resetPassword(requestPayload);
    }
);

export const changeEmail = createThunk(
    'auth/changeEmail',
    (requestPayload: ChangeEmailRequestPayload) => {
        return authService.changeEmail(requestPayload);
    }
);

export const changePassword = createThunk(
    'auth/changePassword',
    async (requestPayload: ChangePasswordRequestPayload) => {
        return authService.changePassword(requestPayload);
    }
);

export const confirmChangeEmail = createThunk(
    'auth/confirmChangeEmail',
    async (requestPayload: ConfirmChangeEmailRequestPayload) => {
        const responsePayload = await authService.confirmChangeEmail(requestPayload);

        const user = JSON.parse(localStorage.getItem('user') || '{}');

        localStorage.setItem('user', JSON.stringify({
            ...user,
            email: responsePayload.newEmail
        }));

        return responsePayload;
    }
);

export const confirmChangePassword = createThunk(
    'auth/confirmChangePassword',
    async (requestPayload: ConfirmChangePasswordRequestPayload) => {
        return authService.confirmChangePassword(requestPayload);
    }
);

export const logout = createThunk(
    'auth/logout',
    async () => {
        const responsePayload = await authService.logout();
        localStorage.removeItem('user');
        return responsePayload;
    }
);