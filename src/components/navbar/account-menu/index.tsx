import UserMenuContent from './user-menu-content';
import GuestMenuContent from './guest-menu-content';
import { Menu } from './styles';
import { AccountMenuProps } from './types';

function AccountMenu(props: AccountMenuProps) {
    const { user, isOpen, anchorElement, handleCloseMenu } = props;

    return (
        <Menu
            open={isOpen}
            anchorEl={anchorElement}
            onClose={() => handleCloseMenu()}
            keepMounted
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            {
                user
                    ? <UserMenuContent user={user} handleCloseMenu={handleCloseMenu} />
                    : <GuestMenuContent handleCloseMenu={handleCloseMenu} />
            }
        </Menu>
    )
}

export default AccountMenu;