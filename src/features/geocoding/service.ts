import ApiClient from '../../utils/api-utils';
import type {
    GetCoordsByAddressRequestPayload,
    GetCoordsByAddressResponsePayload
} from './types';

class GeocodingService {
    private api: ApiClient;
    private readonly geocodingUrl: string;

    constructor() {
        this.api = ApiClient.getInstance();
        this.geocodingUrl = '/api/geocoding';
    }

    public async getCoordsByAddress(requestPayload: GetCoordsByAddressRequestPayload): Promise<GetCoordsByAddressResponsePayload> {
        const { address } = requestPayload;
        return this.api.get<GetCoordsByAddressResponsePayload>(`${this.geocodingUrl}/coords/${address}`);
    }
}

export const geocodingService = new GeocodingService();