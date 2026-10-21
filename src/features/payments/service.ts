import ApiClient from '../../utils/api-utils';
import {
    CreateRequestPayload,
    CreateResponsePayload
} from './types';

class PaymentsService {
    private api: ApiClient;
    private readonly paymentsUrl: string;

    constructor() {
        this.api = ApiClient.getInstance();
        this.paymentsUrl = '/api/payments';
    }

    public async create(requestPayload: CreateRequestPayload): Promise<CreateResponsePayload> {
        return this.api.post<CreateResponsePayload>(this.paymentsUrl, requestPayload);
    }
}

export const paymentsService = new PaymentsService();