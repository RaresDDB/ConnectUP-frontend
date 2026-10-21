import { styled } from '@mui/material/styles';

export const MainContainer = styled('main')({
    display: 'flex',
    justifyContent: 'center',
    height: 'calc(100vh - 64px - 64px)',
    padding: '0 32px'
})

export const InnerContainer = styled('div')({
    width: '1200px',
    padding: '32px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
});

export const TopContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

export const Title = styled('h2')({
});

export const ViewControls = styled('div')({
});

export const MiddleContainer = styled('div')({
    display: 'flex',
    gap: '32px'
});


export const LoadingContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
    height: '100%',
    padding: '2rem',
    gap: '1rem'
});

export const LoadingText = styled('p')({});

export const EmptyMessage = styled('p')({
    textAlign: 'center',
    color: '#666',
    fontSize: '1rem'
});

export const CardsContainer = styled('div')(({ theme }) => ({
    flex: '1',
    maxHeight: 'calc(100vh - 64px - 64px - 128px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.primary.light} transparent`,
    paddingRight: '16px'
}));

export const NoEventsText = styled('p')({
});

export const MapWrapper = styled('div')({
    flex: '1',
    height: 'calc(100vh - 64px - 64px - 128px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});