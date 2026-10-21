import ApiClient from '../../utils/api-utils';
import type { Tag } from '../../types/tag-types';

class TagsService {
    private api: ApiClient;
    private readonly tagsUrl: string;

    constructor() {
        this.api = ApiClient.getInstance();
        this.tagsUrl = '/api/tags';
    }

    public async getAll(): Promise<Tag[]> {
        return this.api.get<Tag[]>(this.tagsUrl);
    }
}

export const tagsService = new TagsService();