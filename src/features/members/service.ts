import ApiClient from '../../utils/api-utils';
import { GetAllResponsePayload } from './types';

class MembersService {
    private api: ApiClient;
    private readonly membersUrl: string;

    constructor() {
        this.api = ApiClient.getInstance();
        this.membersUrl = '/api/members';
    }

    public async getAll(): Promise<GetAllResponsePayload> {
        return this.api.get<GetAllResponsePayload>(this.membersUrl);
    }
}

export const membersService = new MembersService();