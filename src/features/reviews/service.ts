import ApiClient from '../../utils/api-utils';
import {
    CreateRequestPayload,
    CreateResponsePayload
} from './types';

class ReviewsService {
    private api: ApiClient;
    private readonly reviewsUrl: string;

    constructor() {
        this.api = ApiClient.getInstance();
        this.reviewsUrl = '/api/reviews';
    }

    public async create(requestPayload: CreateRequestPayload): Promise<CreateResponsePayload> {
        return this.api.post<CreateResponsePayload>(this.reviewsUrl, requestPayload);
    }
}

export const reviewsService = new ReviewsService();