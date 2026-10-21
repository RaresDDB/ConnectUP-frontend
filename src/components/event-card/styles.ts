import { styled } from '@mui/material/styles';
import { RouterLink } from '../../styles/shared/styles';
import {
    Button,
    IconButton
} from '@mui/material';

export const CardLink = styled(RouterLink)(({ theme }) => ({
    display: 'flex',
    gap: '16px',
    color: '#000',
    padding: '16px 0',
    position: 'relative',
    textDecoration: 'none',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        transition: 'width 0.5s ease-out',
    },
    '&:hover::after': {
        width: '100%'
    }
}));

export const ImageWrapper = styled('div')({
    flex: '0 0 200px',
    height: '150px',
});

export const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
});

export const DetailsContainer = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
});

export const TopContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

export const DateText = styled('span')({
});

export const FavoriteWrapper = styled('div')({});

export const FavoriteIconButton = styled(IconButton)({});

export const MiddleContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
});

export const InnerContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px'
});

export const Title = styled('h4')({});

export const Description = styled('p')({});

export const Price = styled('span')({
    flex: '0 0 64px',
    fontSize: '14px'
});

export const MaxAttendees = styled('span')({
    flex: '0 0 64px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
});

export const BottomContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    marginTop: 'auto'
});

export const Attendees = styled('span')({
});

export const AttendButton = styled(Button)({
    fontSize: '10px'
});

export const DeleteButton = styled(Button)({
    fontSize: '10px'
});