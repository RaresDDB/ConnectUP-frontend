import { styled } from '@mui/material/styles';
import { LoadingButton } from '../../../styles/shared/styles';
import {
    Button,
    TextField,
    IconButton,
    FormControl,
    FormControlLabel
} from '@mui/material';

export const MainContainer = styled('main')({
    display: 'flex',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px - 64px)',
    padding: '48px 32px'
})

export const InnerContainer = styled('div')({
    width: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
});

export const TitleWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

export const Title = styled('h2')({
});

export const FormWrapper = styled('div')({
    display: 'flex',
    gap: '16px'
});

export const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: '1',
    backgroundColor: '#fff',
    padding: '16px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

export const IsPaidFormControlLabel = styled(FormControlLabel)({
    height: '40px'
});

export const InputsGroup = styled('div')({
    display: 'flex',
    gap: '16px'
});

export const InputField = styled(TextField)({
    flex: '1',
});

export const InputFormControl = styled(FormControl)({
    flex: '1',
});

export const DragAndDropZone = styled('div')({
    border: '2px dashed #ccc',
    padding: '20px',
    textAlign: 'center',
    ':hover': {
        cursor: 'pointer'
    }
});

export const Input = styled('input')({
});

export const Text = styled('p')({
});

export const ImageContainer = styled('div')({
    border: '2px dashed #ccc',
    padding: '8px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

export const Image = styled('img')({
    width: '100%',
    objectFit: 'cover'
});

export const GalleryContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px'
});

export const GalleryImageContainer = styled('div')({
    position: 'relative'
});

export const GalleryImage = styled(Image)({
    height: '250px'
});

export const CancelIconButton = styled(IconButton)({
    position: 'absolute',
    top: '4px',
    right: '4px',
    backgroundColor: '#fff',
    ":hover": {
        backgroundColor: '#ccc'
    }
});

export const SubmitButtonWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center'
})

export const LoadingSubmitButton = styled(LoadingButton)({
    height: '40px',
    width: '100%',
})

export const SubmitButton = styled(Button)({
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px 0',
    fontSize: '11px'
})


export const MapWrapper = styled('div')({
    height: 'calc(100vh / 2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});