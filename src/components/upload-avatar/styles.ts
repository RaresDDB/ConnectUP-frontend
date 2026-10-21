import { styled } from "@mui/material/styles";
import {
    Avatar,
    IconButton
} from "@mui/material";

export const AvatarContainer = styled("div", {
    shouldForwardProp: (prop) => prop !== 'size'
})<{ size: number }>(({ size }) => ({
    position: 'relative',
    width: size,
    height: size,
    margin: '0 auto',
    cursor: 'pointer',
    borderRadius: '50%',
    '&:hover .MuiIconButton-root': {
        opacity: 0.8,
    }
}));

export const UserAvatar = styled(Avatar)<{ size: number }>(({ size }) => ({
    width: size,
    height: size,
    objectFit: 'cover'
}));

export const UploadIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: theme.palette.common.white,
    opacity: 0,
    transition: 'opacity 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
}));

export const Input = styled('input')({
});