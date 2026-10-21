import { styled } from '@mui/material/styles';
import { MarkerImageProps } from './types';

export const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '10px',
});

export const Title = styled('h3')({
});

export const Text = styled('p')({
});

export const EventImage = styled('img')({
    width: '90%',
    height: '200px',
    objectFit: 'cover'
});

export const MarkerImage = styled('img')<MarkerImageProps>(({ size }) => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #000',
    '&:hover': {
        cursor: 'pointer'
    }
}));