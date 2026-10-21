import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ListItemIcon } from '@mui/material';

export const LinkItem = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: '#000',
    padding: '8px 16px',
    width: '100%'
})

export const ItemIcon = styled(ListItemIcon)({
    color: "#000"
})

export const ItemText = styled('span')({
    lineHeight: 'normal',
    marginTop: '1px'
})