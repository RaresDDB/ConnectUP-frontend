import { AvatarProps as MuiAvatarProps } from "@mui/material";

export interface GuestMenuContentProps {
    handleCloseMenu: () => void;
}

export interface AvatarProps extends MuiAvatarProps {
    width: number,
    height: number
}