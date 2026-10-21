import { Avatar } from "@mui/material";
import { BaseAvatarProps } from "./types";

function BaseAvatar(props: BaseAvatarProps) {
    const { size, name, imageUri, showFullName } = props;

    return (
        <Avatar alt={`${name} avatar`} src={imageUri ? `/static/uploads/avatars/${imageUri}` : undefined} sx={{ width: size, height: size }}>
            {showFullName ? name : name[0]?.toUpperCase()}
        </Avatar>
    )
}

export default BaseAvatar;