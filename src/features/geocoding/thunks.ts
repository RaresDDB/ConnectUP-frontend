import { createThunk } from '../thunks';
import { geocodingService } from './service';
import type {
    GetCoordsByAddressRequestPayload,
    GetCoordsByAddressResponsePayload
} from './types';

export const getCoordsByAddress = createThunk<
    GetCoordsByAddressResponsePayload,
    GetCoordsByAddressRequestPayload
>(
    'geocoding/getCoordsByAddress',
    async (requestPayload) => {
        return await geocodingService.getCoordsByAddress(requestPayload);
    }
);