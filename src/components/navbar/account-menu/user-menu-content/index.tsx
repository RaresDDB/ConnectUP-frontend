import UserAvatar from '../../../user-avatar';
import AccountMenuItem from '../account-menu-item';
import { Role } from '../../../../enums/role-enums';
import { ROUTES } from '../../../../constants/route-constants';
import { Divider } from '@mui/material';
import { Fragment } from 'react';
import { GoSignOut } from "react-icons/go";
import { FaMapMarked } from 'react-icons/fa';
import { UserMenuContentProps } from './types';
import {
    MdEvent,
    MdSettings
} from 'react-icons/md';
import {
    Email,
    MenuItem,
    FullName,
    UserDetails,
} from './styles';

function UserMenuContent(props: UserMenuContentProps) {
    const { user, handleCloseMenu } = props;

    const { email, firstName, lastName, role } = user;

    const renderMenuItems = () => {
        const menuConfig = {
            [Role.Admin]: [
                { to: ROUTES.CREATE_EVENT.path, icon: <MdEvent fontSize='small' />, text: 'Create event' },
                { to: ROUTES.MANAGE_EVENTS.path, icon: <FaMapMarked fontSize='small' />, text: 'Manage events' },
                { to: ROUTES.ACCOUNT_SETTINGS.path, icon: <MdSettings fontSize='small' />, text: 'Account settings' },
            ],
            [Role.Member]: [
                { to: ROUTES.EVENTS.path, icon: <MdEvent fontSize='small' />, text: 'All events' },
                { to: ROUTES.NEARBY_EVENTS.path, icon: <FaMapMarked fontSize='small' />, text: 'Nearby events' },
                { to: ROUTES.ACCOUNT_SETTINGS.path, icon: <MdSettings fontSize='small' />, text: 'Account settings' },
            ]
        };

        const items = menuConfig[role.name as Role] || [];

        return (
            <>
                {items.map(({ to, icon, text }, index) => (
                    <AccountMenuItem
                        key={index}
                        to={to}
                        onClick={handleCloseMenu}
                        icon={icon}
                        text={text}
                    />
                ))}
            </>
        );
    };

    return (
        <Fragment>
            <MenuItem>
                <UserAvatar user={user} size={40} />
                <UserDetails >
                    <FullName>
                        {`${lastName} ${firstName}`}
                    </FullName>
                    <Email>
                        {email}
                    </Email>
                </UserDetails>
            </MenuItem>
            <Divider />
            {renderMenuItems()}
            <Divider />
            <AccountMenuItem
                to={ROUTES.LOGOUT.path}
                onClick={handleCloseMenu}
                icon={<GoSignOut fontSize='small' />}
                text='Logout'
            />
        </Fragment>
    )
}

export default UserMenuContent;