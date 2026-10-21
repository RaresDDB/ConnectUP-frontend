import BaseAvatar from '../base-avatar';
import { UserAvatarProps } from './types';

function UserAvatar(props: UserAvatarProps) {
    const { user, size } = props;

    return (
        <BaseAvatar
            size={size}
            name={user ? `${user.firstName} ${user.lastName}` : 'Guest'}
            imageUri={user ? user.avatarUri : null}
        />
    )
}

export default UserAvatar;