import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

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

export const UserDetails = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
})

export const FullName = styled('span')({
    lineHeight: '1.2'
})

export const Email = styled('span')(({ theme }) => ({
    lineHeight: '1.2',
    fontSize: '14px',
    color: theme.palette.grey[500]
}))