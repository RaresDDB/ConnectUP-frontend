import { User } from '../../../types/user-types';

export interface AccountMenuProps {
    user: User | null;
    isOpen: boolean;
    anchorElement: HTMLButtonElement | null;
    handleCloseMenu: () => void;
}