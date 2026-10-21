import { createThunk } from '../thunks';
import { paymentsService } from './service';
import { CreateRequestPayload } from './types';

export const createPayment = createThunk(
    'payments/create',
    async (requestPayload: CreateRequestPayload) => {
        return await paymentsService.create(requestPayload);
    }
)