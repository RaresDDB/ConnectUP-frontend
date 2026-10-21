import { styled } from "@mui/material/styles";

export const PhotosContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
});

export const PhotosTitle = styled('h3')({
});

export const Photo = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover'
});