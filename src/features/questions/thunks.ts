import { createThunk } from '../thunks';
import { questionsService } from './service';
import { CreateRequestPayload } from './types';

export const createQuestion = createThunk(
    'questions/create',
    async (requestPayload: CreateRequestPayload) => {
        return await questionsService.create(requestPayload);
    }
)