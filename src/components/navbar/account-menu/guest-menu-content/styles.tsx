import { styled } from '@mui/material/styles';
import { AvatarProps } from './types';
import {
    Menu as MuiMenu,
    Avatar as MuiAvatar,
    MenuItem as MuiMenuItem,
} from '@mui/material';

export const Menu = styled(MuiMenu)({
    '& .MuiPaper-root': {
        minWidth: '200px'
    }
})

export const MenuItem = styled(MuiMenuItem)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0',
    color: '#000',
    '& .MuiListItemIcon-root': {
        minWidth: 'auto'
    },
    ':first-of-type': {
        padding: '8px 16px',
        pointerEvents: 'none'
    }
})

export const Avatar = styled(MuiAvatar)<AvatarProps>(({ width, height }) => ({
    width: `${width}px`,
    height: `${height}px`
}));

export const UserDetails = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
})

export const Name = styled('span')({
    lineHeight: '1.2'
})