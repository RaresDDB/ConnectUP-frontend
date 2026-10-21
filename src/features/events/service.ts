import ApiClient from '../../utils/api-utils';
import {
    CreateRequestPayload,
    GetAllRequestPayload,
    AttendRequestPayload,
    GetAllResponsePayload,
    CreateResponsePayload,
    GetByIdRequestPayload,
    AttendResponsePayload,
    GetByIdResponsePayload,
    UnattendRequestPayload,
    GetNearbyRequestPayload,
    UnattendResponsePayload,
    DeleteByIdRequestPayload,
    GetNearbyResponsePayload,
    DeleteByIdResponsePayload,
    AddEventToFavoritesRequestPayload,
    AddEventToFavoritesResponsePayload,
    RemoveEventFromFavoritesRequestPayload,
    RemoveEventFromFavoritesResponsePayload
} from './types';

class EventsService {
    private api: ApiClient;
    private readonly eventsUrl: string;

    constructor() {
        this.api = ApiClient.getInstance();
        this.eventsUrl = '/api/events';
    }

    public async create(requestPayload: CreateRequestPayload): Promise<CreateResponsePayload> {
        const {
            tags,
            title,
            image,
            price,
            isPaid,
            marker,
            hostId,
            gallery,
            endDate,
            currency,
            startDate,
            description,
            maxAttendees
        } = requestPayload;

        const formData = new FormData();

        formData.append('title', title);
        formData.append('hostId', hostId);
        formData.append('endDate', endDate);
        formData.append('currency', currency);
        formData.append('startDate', startDate);
        formData.append('description', description);

        formData.append('tags', JSON.stringify(tags));

        formData.append('lat', marker.lat.toString());
        formData.append('lng', marker.lng.toString());

        formData.append('price', price.toString());
        formData.append('isPaid', isPaid.toString());
        formData.append('maxAttendees', maxAttendees.toString());

        formData.append('image', image);

        gallery.forEach(img => {
            formData.append('gallery', img);
        });

        return this.api.uploadFile<CreateResponsePayload>('POST', this.eventsUrl, formData);
    }

    public async getAll(): Promise<GetAllResponsePayload> {
        return this.api.get<GetAllResponsePayload>(this.eventsUrl);
    }

    public async getById(requestPayload: GetByIdRequestPayload): Promise<GetByIdResponsePayload> {
        const { id } = requestPayload;
        return this.api.get<GetByIdResponsePayload>(`${this.eventsUrl}/${id}`);
    }

    public async attend(requestPayload: AttendRequestPayload): Promise<AttendResponsePayload> {
        const { id } = requestPayload;
        return this.api.post<AttendResponsePayload>(`${this.eventsUrl}/${id}/attend`);
    }

    public async unattend(requestPayload: UnattendRequestPayload): Promise<UnattendResponsePayload> {
        const { id } = requestPayload;
        return this.api.delete<AttendResponsePayload>(`${this.eventsUrl}/${id}/attend`);
    }

    public async getNearby(requestPayload: GetNearbyRequestPayload): Promise<GetNearbyResponsePayload> {
        const params = new URLSearchParams();

        params.append('lat', requestPayload.lat.toString());
        params.append('lng', requestPayload.lng.toString());
        params.append('radius', requestPayload.radius.toString());

        const queryString = params.toString();

        const url = `${this.eventsUrl}/nearby?${queryString}`;

        return this.api.get<GetNearbyResponsePayload>(url);
    }

    public async deleteById(requestPayload: DeleteByIdRequestPayload): Promise<DeleteByIdResponsePayload> {
        const { id } = requestPayload;
        return this.api.delete<DeleteByIdResponsePayload>(`${this.eventsUrl}/${id}`);
    }

    public async addToFavorites(requestPayload: AddEventToFavoritesRequestPayload): Promise<AddEventToFavoritesResponsePayload> {
        const { id } = requestPayload;
        return this.api.post<AddEventToFavoritesResponsePayload>(`${this.eventsUrl}/${id}/favorites`)
    }

    public async removeFromFavorites(requestPayload: RemoveEventFromFavoritesRequestPayload): Promise<RemoveEventFromFavoritesResponsePayload> {
        const { id } = requestPayload;
        return this.api.delete<RemoveEventFromFavoritesResponsePayload>(`${this.eventsUrl}/${id}/favorites`)
    }
}

export const eventsService = new EventsService();