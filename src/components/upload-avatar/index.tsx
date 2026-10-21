import { MdAddAPhoto } from 'react-icons/md';
import {
    useRef,
    useState,
    useEffect,
    ChangeEvent
} from 'react';
import {
    Input,
    UserAvatar,
    AvatarContainer,
    UploadIconButton
} from './styles';

interface UploadAvatarProps {
    /** Current avatar file */
    value: File | null;
    /** Default image URL to show when no avatar is selected */
    defaultImage?: string;
    /** Handler for when a new avatar is selected */
    onChange: (file: File | null) => void;
    /** Avatar size in pixels */
    size?: number;
    /** Preview URL for the image */
    preview?: string | null;
    /** Allow preview of the selected image */
    showPreview?: boolean;
    /** Custom error message */
    error?: string;
    /** Whether the avatar upload is required */
    required?: boolean;
    /** Accepted file types */
    accept?: string;
    /** Maximum file size in bytes (default: 5MB) */
    maxSize?: number;
    /** Whether the component is disabled */
    disabled?: boolean;
}

function UploadAvatar(props: UploadAvatarProps) {
    const {
        value,
        defaultImage = '/default-avatar.png',
        onChange,
        size = 120,
        showPreview = true,
        preview = null,
        required = false,
        accept = 'image/jpeg,image/jpg,image/png',
        maxSize = 5 * 1024 * 1024, // 5MB
        disabled = false
    } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(preview);

    useEffect(() => {
        if (value && showPreview) {
            const url = URL.createObjectURL(value);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(preview || null);
        }
    }, [value, showPreview, preview]);

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        if (file) {
            const validTypes = accept.split(',');
            if (!validTypes.includes(file.type)) {
                onChange(null);
                return;
            }

            if (file.size > maxSize) {
                onChange(null);
                return;
            }
        }

        onChange(file);
    };

    return (
        <AvatarContainer
            onClick={handleClick}
            size={size}
        >
            <UserAvatar
                src={previewUrl || (value ? URL.createObjectURL(value) : defaultImage)}
                alt="Avatar"
                size={size}
            />
            <UploadIconButton className="MuiIconButton-root">
                <MdAddAPhoto />
            </UploadIconButton>
            <Input
                type="file"
                hidden
                ref={fileInputRef}
                accept={accept}
                required={required}
                disabled={disabled}
                onChange={handleFileChange}
            />
        </AvatarContainer>
    );
}

export default UploadAvatar;