import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DetailsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: '1 1 0'
});

export const EventImageWrapper = styled('div')({
    width: '100%'
});

export const EventImage = styled('img')({
    width: '100%',
    objectFit: 'cover'
});

export const Description = styled('p')({
});