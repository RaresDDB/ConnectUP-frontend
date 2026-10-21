import { User } from '../../../../types/user-types';

export interface UserMenuContentProps {
    user: User;
    handleCloseMenu: () => void;
}