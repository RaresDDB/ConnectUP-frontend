import { styled } from '@mui/material/styles'
import { Divider } from '@mui/material';

export const MainContainer = styled('div')({
    minHeight: 'calc(100vh - 64px - 64px)',
    display: 'flex',
    flexDirection: 'column'
});

export const MiddleMainContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F6F7F8',
    padding: '32px'
});

export const MiddleInnerContainer = styled('div')({
    width: '1200px',
    display: 'flex',
    gap: '16px'
});

export const EventMetadataContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: "16px",
    flex: '0 0 350px'
});

export const DividerWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F6F7F8'
});

export const ContainersDivider = styled(Divider)({
    width: '1200px'
});

export const BottomMainContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '32px',
    padding: '32px',
    backgroundColor: '#F6F7F8'
});

export const ReviewsWrapper = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
});

export const QuestionsWrapper = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
});