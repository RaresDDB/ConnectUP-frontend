import axios from 'axios';
import { ERRORS } from '../constants/error-constants';
import { Severity } from '../enums/severity-enums';
import { ErrorResponsePayload } from '../types/features-types';
import {
    isAxiosError,
    AxiosInstance,
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

class ApiClient {
    private api: AxiosInstance;
    private static instance: ApiClient;

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || '',
            withCredentials: true,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.api.interceptors.request.use(
            (config) => {
                // You could add authentication headers here
                // const token = localStorage.getItem('token');
                // if (token) {
                //     config.headers.Authorization = `Bearer ${token}`;
                // }
                return config;
            },
            (error) => Promise.reject(this.normalizeError(error))
        );

        this.api.interceptors.response.use(
            (response) => response,
            (error) => Promise.reject(this.normalizeError(error))
        );
    }

    private normalizeError(error: any): ErrorResponsePayload {
        if (isAxiosError(error)) {
            if (!error.response) {
                return {
                    message: ERRORS.general.network,
                    severity: Severity.Error
                };
            }

            return {
                message: error.response.data?.message || ERRORS.general.unknown,
                severity: error.response.data?.severity || Severity.Error
            };
        }

        return {
            message: error.message || ERRORS.general.unknown,
            severity: Severity.Error
        };
    }

    private async request<T>(
        method: string,
        endpoint: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.api.request({
                method,
                url: endpoint,
                data,
                ...config
            });

            return response.data;
        } catch (error) {
            throw this.normalizeError(error);
        }
    }

    public async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('GET', endpoint, undefined, config);
    }

    public async post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('POST', endpoint, data, config);
    }

    public async put<T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('PUT', endpoint, data, config);
    }

    public async patch<T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('PATCH', endpoint, data, config);
    }

    public async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('DELETE', endpoint, undefined, config);
    }

    public async uploadFile<T>(
        method: 'POST' | 'PUT' | 'PATCH',
        endpoint: string,
        formData: FormData,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>(method, endpoint, formData, {
            ...config,
            headers: {
                ...config?.headers,
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default ApiClient;