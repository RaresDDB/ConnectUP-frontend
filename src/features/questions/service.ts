import ApiClient from '../../utils/api-utils';
import {
    CreateRequestPayload,
    CreateResponsePayload
} from './types';

class QuestionsService {
    private api: ApiClient;
    private readonly questionsUrl: string;

    constructor() {
        this.api = ApiClient.getInstance();
        this.questionsUrl = '/api/questions';
    }

    public async create(requestPayload: CreateRequestPayload): Promise<CreateResponsePayload> {
        return this.api.post<CreateResponsePayload>(this.questionsUrl, requestPayload);
    }
}

export const questionsService = new QuestionsService();