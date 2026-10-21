import dayjs from "dayjs";
import FormUtils from "../../../utils/form-utils";
import UploadAvatar from "../../upload-avatar";
import defaultAvatar from '../../../assets/images/default-avatar.jpeg';
import { Data } from "./types";
import { Dayjs } from "dayjs";
import { ERRORS } from "../../../constants/error-constants";
import { Severity } from "../../../enums/severity-enums";
import { showToastr } from "../../../features/toastr/slice";
import { updateById } from "../../../features/auth/thunks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useUpdateById } from "../../../features/auth/hooks";
import { useGetAllTags } from "../../../features/tags/hooks";
import {
    DatePicker,
    LocalizationProvider
} from '@mui/x-date-pickers';
import {
    useAppDispatch,
    useAppSelector
} from "../../../store";
import {
    useState,
    useEffect,
    FormEvent,
    ChangeEvent
} from "react";
import {
    Form,
    Title,
    FieldsGroup,
    SubmitButton,
    FieldsContainer,
    LoadingSubmitButton,
    SubmitButtonWrapper,
    UploadAvatarContainer
} from "./styles";
import {
    Select,
    MenuItem,
    Checkbox,
    TextField,
    InputLabel,
    Typography,
    FormControl,
    ListItemText,
    OutlinedInput,
    SelectChangeEvent,
} from "@mui/material";

const defaultData = {
    firstName: '',
    lastName: '',
    tags: [],
    username: '',
    birthDate: new Date(),
    gender: '',
    avatar: null
}

const defaultErrors = {
    firstName: '',
    lastName: '',
    username: '',
    birthDate: '',
    avatar: ''
}

function ChangeDetails() {
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth.user);

    const { tags } = useGetAllTags();
    const { isLoading } = useUpdateById();

    const [data, setData] = useState<Data>(defaultData);
    const [errors, setErrors] = useState(defaultErrors);

    const isDisabled = FormUtils.isInvalid(data, errors);

    const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            firstName: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                firstName: ERRORS.firstName.required
            });
            return;
        }

        if (e.target.value.length < 2) {
            setErrors({
                ...errors,
                firstName: ERRORS.firstName.minLength
            });
            return;
        }

        if (e.target.value.length > 30) {
            setErrors({
                ...errors,
                firstName: ERRORS.firstName.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                firstName: ERRORS.firstName.onlySpaces
            });
            return;
        }

        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
            setErrors({
                ...errors,
                firstName: ERRORS.firstName.onlyLetters
            });
            return;
        }

        setErrors({
            ...errors,
            firstName: ''
        });
    }

    const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            lastName: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                lastName: ERRORS.lastName.required
            });
            return;
        }

        if (e.target.value.length < 2) {
            setErrors({
                ...errors,
                lastName: ERRORS.lastName.minLength
            });
            return;
        }

        if (e.target.value.length > 30) {
            setErrors({
                ...errors,
                lastName: ERRORS.lastName.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                lastName: ERRORS.lastName.onlySpaces
            });
            return;
        }

        if (!/^[a-zA-Z]+$/.test(e.target.value)) {
            setErrors({
                ...errors,
                lastName: ERRORS.lastName.onlyLetters
            });
            return;
        }

        setErrors({
            ...errors,
            lastName: ''
        });
    }

    const handleChangeTags = (e: SelectChangeEvent<typeof data.tags>) => {
        const {
            target: { value },
        } = e;

        setData({
            ...data,
            tags: typeof value === 'string' ? value.split(',') : value
        });
    };

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            username: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                username: ERRORS.username.required
            });
            return;
        }

        if (e.target.value.length < 3) {
            setErrors({
                ...errors,
                username: ERRORS.username.minLength
            });
            return;
        }

        if (e.target.value.length > 30) {
            setErrors({
                ...errors,
                username: ERRORS.username.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                username: ERRORS.username.onlySpaces
            });
            return;
        }

        if (!/^[a-zA-Z0-9_.]+$/.test(e.target.value)) {
            setErrors({
                ...errors,
                username: ERRORS.username.invalidChars
            });
            return;
        }

        setErrors({
            ...errors,
            username: ''
        });
    }

    const handleChangeBirthDate = (newDate: Dayjs | null) => {
        if (!newDate) {
            setErrors({
                ...errors,
                birthDate: ERRORS.birthDate.required
            });
            return;
        }

        const dateValue = newDate.toDate();

        const currentDate = new Date();

        if (dateValue > currentDate) {
            setErrors({
                ...errors,
                birthDate: ERRORS.birthDate.futureDate
            });
            return;
        }

        const thirteenYearsAgo = new Date();

        thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

        if (dateValue > thirteenYearsAgo) {
            setErrors({
                ...errors,
                birthDate: ERRORS.birthDate.tooYoung
            });
            return;
        }

        setData({
            ...data,
            birthDate: dateValue
        });

        setErrors({
            ...errors,
            birthDate: ''
        });
    }

    const handleChangeGender = (e: SelectChangeEvent<unknown>) => {
        setData({
            ...data,
            gender: e.target.value as string
        });
    }

    const handleChangeAvatar = (file: File | null) => {
        setData({
            ...data,
            avatar: file
        });

        if (file) {
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validImageTypes.includes(file.type)) {
                dispatch(
                    showToastr({
                        message: ERRORS.avatar.invalidFormat,
                        severity: Severity.Error,
                    })
                );
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                dispatch(
                    showToastr({
                        message: ERRORS.avatar.tooLarge,
                        severity: Severity.Error,
                    })
                );
                return;
            }
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            return;
        }

        dispatch(
            updateById(
                {
                    id: user.id,
                    ...data
                }
            )
        )

        setData(defaultData);
    }

    useEffect(() => {
        if (!user) {
            return;
        }

        setData({
            lastName: user.lastName,
            username: user.username,
            firstName: user.firstName,
            tags: user.tags.map(tag => tag.name),
            gender: user.gender,
            birthDate: new Date(user.birthDate),
            avatar: null
        })
    }, [user]);

    if (!user || !tags) {
        return null;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Title>
                Change details
            </Title>
            <FieldsContainer>
                <FieldsGroup>
                    <TextField
                        fullWidth
                        required
                        size="small"
                        name='firstName'
                        label='First name'
                        value={data.firstName}
                        error={errors.firstName !== ''}
                        helperText={errors.firstName}
                        onChange={handleChangeFirstName}
                    />
                    <TextField
                        fullWidth
                        required
                        size="small"
                        name='lastName'
                        label='Last name'
                        value={data.lastName}
                        error={errors.lastName !== ''}
                        helperText={errors.lastName}
                        onChange={handleChangeLastName}
                    />
                </FieldsGroup>
                <FieldsGroup>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Birth Date"
                            value={data.birthDate ? dayjs(data.birthDate) : null}
                            onChange={handleChangeBirthDate}
                            format="DD/MM/YYYY"
                            slotProps={{
                                textField: {
                                    size: "small",
                                    fullWidth: true,
                                    error: errors.birthDate !== '',
                                    helperText: errors.birthDate,
                                    required: true
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <FormControl fullWidth size="small" required>
                        <InputLabel id="gender-select-label">Gender</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            value={data.gender}
                            onChange={handleChangeGender}
                            input={<OutlinedInput label="Gender" />}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </FieldsGroup>
                <TextField
                    fullWidth
                    required
                    size="small"
                    name='username'
                    label='Username'
                    value={data.username}
                    error={errors.username !== ''}
                    helperText={errors.username}
                    onChange={handleChangeUsername}
                />
                <FormControl size="small" fullWidth required>
                    <InputLabel id="tags-select-label">Tags</InputLabel>
                    <Select
                        labelId="tags-select-label"
                        id="tags-select"
                        multiple
                        value={data.tags}
                        onChange={handleChangeTags}
                        input={<OutlinedInput label="Tags" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 240
                                },
                            },
                        }}
                    >
                        {tags.map(({ name }, index) => (
                            <MenuItem key={index} value={name}>
                                <Checkbox checked={data.tags.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <UploadAvatarContainer>
                    <UploadAvatar
                        value={data.avatar}
                        preview={`/static/uploads/avatars/${user.avatarUri}`}
                        onChange={handleChangeAvatar}
                        size={128}
                        defaultImage={defaultAvatar}
                    />
                    <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                        textAlign="center"
                    >
                        Click to upload your profile picture (Max 5MB)
                    </Typography>
                </UploadAvatarContainer>
            </FieldsContainer>
            <SubmitButtonWrapper>
                {
                    isLoading ?
                        <LoadingSubmitButton />
                        :
                        <SubmitButton type='submit' variant="contained" disabled={isDisabled}>
                            Change details
                        </SubmitButton>
                }
            </SubmitButtonWrapper>
        </Form>
    )
}

export default ChangeDetails;