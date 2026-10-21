import { createThunk } from '../thunks';
import { membersService } from './service';

export const getAllMembers = createThunk(
    'members/getAll',
    async () => {
        return await membersService.getAll();
    }
)