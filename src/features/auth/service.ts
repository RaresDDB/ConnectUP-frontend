import ApiClient from '../../utils/api-utils';
import type {
    LoginRequestPayload,
    UpdateRequestPayload,
    LoginResponsePayload,
    UpdateResponsePayload,
    LogoutResponsePayload,
    RegisterRequestPayload,
    ActivateRequestPayload,
    RegisterResponsePayload,
    ActivateResponsePayload,
    ChangeEmailRequestPayload,
    ChangeEmailResponsePayload,
    ResetPasswordRequestPayload,
    ForgotPasswordRequestPayload,
    ChangePasswordRequestPayload,
    GetLoggedUserResponsePayload,
    ResetPasswordResponsePayload,
    ChangePasswordResponsePayload,
    ForgotPasswordResponsePayload,
    ConfirmChangeEmailRequestPayload,
    ConfirmChangeEmailResponsePayload,
    ConfirmChangePasswordRequestPayload,
    ConfirmChangePasswordResponsePayload
} from './types';

class AuthService {
    private api: ApiClient;
    private readonly authUrl: string;
    private readonly usersUrl: string;

    constructor() {
        this.api = ApiClient.getInstance();
        this.authUrl = '/auth';
        this.usersUrl = '/api/users';
    }

    public async register(requestPayload: RegisterRequestPayload): Promise<RegisterResponsePayload> {
        const { firstName, lastName, email, username, password, birthDate, gender, tags, avatar } = requestPayload;

        const formData = new FormData();

        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('birthDate', birthDate.toString());
        formData.append('gender', gender);
        formData.append('tags', JSON.stringify(tags));

        if (avatar) {
            formData.append('avatar', avatar);
        }

        return this.api.uploadFile<RegisterResponsePayload>('POST', `${this.authUrl}/register`, formData);
    }

    public async activate(requestPayload: ActivateRequestPayload): Promise<ActivateResponsePayload> {
        return this.api.post<ActivateResponsePayload>(`${this.authUrl}/activate`, requestPayload);
    }

    public async login(requestPayload: LoginRequestPayload): Promise<LoginResponsePayload> {
        return this.api.post<LoginResponsePayload>(`${this.authUrl}/login`, requestPayload);
    }

    public async forgotPassword(requestPayload: ForgotPasswordRequestPayload): Promise<ForgotPasswordResponsePayload> {
        return this.api.post<ForgotPasswordResponsePayload>(`${this.authUrl}/forgot-password`, requestPayload);
    }

    public async resetPassword(requestPayload: ResetPasswordRequestPayload): Promise<ResetPasswordResponsePayload> {
        return this.api.post<ResetPasswordResponsePayload>(
            `${this.authUrl}/reset-password`,
            requestPayload
        );
    }

    public async updateById(requestPayload: UpdateRequestPayload): Promise<UpdateResponsePayload> {
        const { id, firstName, lastName, username, birthDate, gender, tags, avatar } = requestPayload;

        const formData = new FormData();

        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('username', username);
        formData.append('birthDate', birthDate.toString());
        formData.append('gender', gender);
        formData.append('tags', JSON.stringify(tags));

        if (avatar) {
            formData.append('avatar', avatar);
        }

        return this.api.uploadFile<UpdateResponsePayload>(
            'PUT',
            `${this.usersUrl}/${id}`,
            formData
        );
    }

    public async getLoggedUser(): Promise<GetLoggedUserResponsePayload> {
        return this.api.get<GetLoggedUserResponsePayload>(`${this.authUrl}/user`);
    }

    public async changeEmail(requestPayload: ChangeEmailRequestPayload): Promise<ChangeEmailResponsePayload> {
        return this.api.post<ChangeEmailResponsePayload>(
            `${this.authUrl}/change-email`,
            requestPayload
        );
    }

    public async changePassword(requestPayload: ChangePasswordRequestPayload): Promise<ChangePasswordResponsePayload> {
        return this.api.post<ChangePasswordResponsePayload>(
            `${this.authUrl}/change-password`,
            requestPayload
        );
    }

    public async confirmChangeEmail(requestPayload: ConfirmChangeEmailRequestPayload): Promise<ConfirmChangeEmailResponsePayload> {
        return this.api.post<ConfirmChangeEmailResponsePayload>(
            `${this.authUrl}/confirm-change-email`,
            requestPayload
        );
    }

    public async confirmChangePassword(requestPayload: ConfirmChangePasswordRequestPayload): Promise<ConfirmChangePasswordResponsePayload> {
        return this.api.post<ConfirmChangePasswordResponsePayload>(
            `${this.authUrl}/confirm-change-password`,
            requestPayload
        );
    }

    public async logout(): Promise<LogoutResponsePayload> {
        return this.api.post<LogoutResponsePayload>(`${this.authUrl}/logout`);
    }
}

export const authService = new AuthService();