import { createThunk } from '../thunks';
import { reviewsService } from './service';
import { CreateRequestPayload } from './types';

export const createReview = createThunk(
    'reviews/create',
    async (requestPayload: CreateRequestPayload) => {
        return await reviewsService.create(requestPayload);
    }
)