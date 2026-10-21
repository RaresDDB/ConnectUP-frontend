import AccountMenuItem from '../account-menu-item';
import { ROUTES } from '../../../../constants/route-constants';
import { Divider } from '@mui/material';
import { Fragment } from 'react';
import { RiProfileLine } from "react-icons/ri";
import { GuestMenuContentProps } from './types';
import {
    MdOutlineSecurity,
    MdOutlineMailLock
} from "react-icons/md";
import {
    Name,
    Avatar,
    MenuItem,
    UserDetails,
} from './styles';

function GuestMenuContent(props: GuestMenuContentProps) {
    const { handleCloseMenu } = props;

    return (
        <Fragment>
            <MenuItem>
                <Avatar
                    width={40}
                    height={40}
                >
                    G
                </Avatar>
                <UserDetails>
                    <Name>
                        Guest
                    </Name>
                </UserDetails>
            </MenuItem>
            <Divider />
            <AccountMenuItem
                to={ROUTES.REGISTER.path}
                onClick={handleCloseMenu}
                icon={<RiProfileLine fontSize='small' />}
                text='Register'
            />
            <AccountMenuItem
                to={ROUTES.LOGIN.path}
                onClick={handleCloseMenu}
                icon={<MdOutlineMailLock fontSize='small' />}
                text='Login'
            />
            <AccountMenuItem
                to={ROUTES.FORGOT_PASSWORD.path}
                onClick={handleCloseMenu}
                icon={<MdOutlineSecurity fontSize='small' />}
                text='Forgot password'
            />
        </Fragment>
    )
}

export default GuestMenuContent;