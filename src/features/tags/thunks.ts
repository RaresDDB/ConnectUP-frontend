import { tagsService } from './service';
import { createThunk } from '../thunks';

export const getAllTags = createThunk(
    'tags/getAll',
    async () => {
        return await tagsService.getAll();
    }
)