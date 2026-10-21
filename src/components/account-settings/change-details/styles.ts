import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

export const Form = styled('form')({
    width: '600px',
    padding: '32px',
    boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    backgroundColor: '#fff'
})

export const Title = styled('h2')({
    textAlign: 'center',
    fontSize: '20px',
})

export const FieldsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
})

export const FieldsGroup = styled('div')({
    display: 'flex',
    gap: '16px',
    width: '100%'
});


export const SubmitButtonWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center'
})

export const LoadingSubmitButton = styled(LoadingButton)({
    height: '32px',
    width: '130px'
})

export const SubmitButton = styled(Button)({
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px 0',
    fontSize: '11px'
})

export const UploadAvatarContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
    marginBottom: '-8px'
});