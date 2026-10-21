import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const InfoContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
});

export const TopContainer = styled('div')({
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
})

export const DateContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
});

export const Date = styled('span')({
});

export const DirectionsIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.main
}));

export const LocationContainer = styled('div')({
    backgroundColor: '#fff',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
});

export const Location = styled('span')({
});

export const MapWrapper = styled('div')({
    width: '100%',
    height: '300px',
});