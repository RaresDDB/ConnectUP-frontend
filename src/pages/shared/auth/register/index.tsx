import dayjs from 'dayjs';
import FormUtils from '../../../../utils/form-utils';
import UploadAvatar from '../../../../components/upload-avatar';
import defaultAvatar from '../../../../assets/images/default-avatar.jpeg';
import { Data } from './types';
import { Dayjs } from 'dayjs';
import { ROUTES } from '../../../../constants/route-constants';
import { ERRORS } from '../../../../constants/error-constants';
import { Severity } from '../../../../enums/severity-enums';
import { register } from '../../../../features/auth/thunks';
import { showToastr } from '../../../../features/toastr/slice';
import { useRegister } from '../../../../features/auth/hooks';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useGetAllTags } from '../../../../features/tags/hooks';
import { useAppDispatch } from '../../../../store';
import {
    DatePicker,
    LocalizationProvider
} from '@mui/x-date-pickers';
import {
    useState,
    FormEvent,
    ChangeEvent
} from "react";
import {
    Select,
    Checkbox,
    MenuItem,
    InputLabel,
    Typography,
    FormControl,
    ListItemText,
    OutlinedInput,
    SelectChangeEvent
} from "@mui/material";
import {
    Form,
    Main,
    Title,
    LoginLink,
    InputField,
    LinkDivider,
    SelectField,
    FieldsGroup,
    SubmitButton,
    FieldsContainer,
    FormControlField,
    LinkDividerWrapper,
    SubmitButtonWrapper,
    LoadingSubmitButton,
    UploadAvatarContainer
} from "./styles";

const defaultData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    tags: [],
    username: '',
    birthDate: null,
    gender: '',
    avatar: null
}

const defaultErrors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    birthDate: '',
    avatar: ''
}

function Register() {
    const dispatch = useAppDispatch();

    const { tags } = useGetAllTags();
    const { isLoading } = useRegister();

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

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            email: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                email: ERRORS.email.required
            });
            return;
        }

        if (e.target.value.length < 6) {
            setErrors({
                ...errors,
                email: ERRORS.email.minLength
            });
            return;
        }

        if (e.target.value.length > 100) {
            setErrors({
                ...errors,
                email: ERRORS.email.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                email: ERRORS.email.onlySpaces
            });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
            setErrors({
                ...errors,
                email: ERRORS.email.invalid
            });
            return;
        }

        setErrors({
            ...errors,
            email: ''
        });
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            password: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                password: ERRORS.password.required
            });
            return;
        }

        if (e.target.value.length < 6) {
            setErrors({
                ...errors,
                password: ERRORS.password.minLength
            });
            return;
        }

        if (e.target.value.length > 30) {
            setErrors({
                ...errors,
                password: ERRORS.password.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                password: ERRORS.password.onlySpaces
            });
            return;
        }

        if (!/[a-z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                password: ERRORS.password.lowerCaseLetter
            });
            return;
        }

        if (!/[A-Z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                password: ERRORS.password.upperCaseLetter
            });
            return;
        }

        if (!/\d/.test(e.target.value)) {
            setErrors({
                ...errors,
                password: ERRORS.password.digit
            });
            return;
        }

        setErrors({
            ...errors,
            password: ''
        });
    }

    const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            confirmPassword: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                confirmPassword: ERRORS.confirmPassword.required
            });
            return;
        }

        if (e.target.value.length < 6) {
            setErrors({
                ...errors,
                confirmPassword: ERRORS.confirmPassword.minLength
            });
            return;
        }

        if (e.target.value.length > 30) {
            setErrors({
                ...errors,
                confirmPassword: ERRORS.confirmPassword.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                confirmPassword: ERRORS.confirmPassword.onlySpaces
            });
            return;
        }

        if (!/[a-z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                confirmPassword: ERRORS.confirmPassword.lowerCaseLetter
            });
            return;
        }

        if (!/[A-Z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                confirmPassword: ERRORS.confirmPassword.upperCaseLetter
            });
            return;
        }

        if (!/\d/.test(e.target.value)) {
            setErrors({
                ...errors,
                confirmPassword: ERRORS.confirmPassword.digit
            });
            return;
        }

        setErrors({
            ...errors,
            confirmPassword: ''
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
        const dateValue = newDate ? newDate.toDate() : null;

        setData({
            ...data,
            birthDate: dateValue
        });

        if (!dateValue) {
            setErrors({
                ...errors,
                birthDate: ERRORS.birthDate.required
            });
            return;
        }

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

        if (data.password !== data.confirmPassword) {
            dispatch(
                showToastr({
                    message: ERRORS.general.passwordsNotTheSame,
                    severity: Severity.Error,
                })
            );
            return;
        }

        if (!data.birthDate) {
            setErrors({
                ...errors,
                birthDate: ERRORS.birthDate.required
            });
            return;
        }

        dispatch(
            register({
                ...data,
                birthDate: data.birthDate!
            })
        )

        setData(defaultData);
    }

    if (!tags) {
        return null;
    }

    return (
        <Main>
            <Form onSubmit={handleSubmit}>
                <Title>
                    Register
                </Title>
                <FieldsContainer>
                    <FieldsGroup>
                        <InputField
                            required
                            size="small"
                            name='firstName'
                            label='First name'
                            value={data.firstName}
                            error={errors.firstName !== ''}
                            helperText={errors.firstName}
                            onChange={handleChangeFirstName}
                        />
                        <InputField
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
                        <InputField
                            required
                            size="small"
                            name='email'
                            type='email'
                            label='Email'
                            value={data.email}
                            error={errors.email !== ''}
                            helperText={errors.email}
                            onChange={handleChangeEmail}
                        />
                        <InputField
                            required
                            size="small"
                            name='username'
                            label='Username'
                            value={data.username}
                            error={errors.username !== ''}
                            helperText={errors.username}
                            onChange={handleChangeUsername}
                        />
                    </FieldsGroup>
                    <FieldsGroup>
                        <InputField
                            required
                            size="small"
                            name='password'
                            type='password'
                            label='Password'
                            value={data.password}
                            error={errors.password !== ''}
                            helperText={errors.password}
                            onChange={handleChangePassword}
                        />
                        <InputField
                            required
                            size="small"
                            name='confirmPassword'
                            type='password'
                            label='Confirm password'
                            value={data.confirmPassword}
                            error={errors.confirmPassword !== ''}
                            helperText={errors.confirmPassword}
                            onChange={handleChangeConfirmPassword}
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
                        <FormControlField size="small" required>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <SelectField
                                labelId="gender-select-label"
                                id="gender-select"
                                value={data.gender}
                                onChange={handleChangeGender}
                                input={<OutlinedInput label="Gender" />}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </SelectField>
                        </FormControlField>
                    </FieldsGroup>
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
                                Register
                            </SubmitButton>
                    }
                </SubmitButtonWrapper>
                <LinkDividerWrapper>
                    <LinkDivider>
                        <LoginLink to={ROUTES.LOGIN.path}>
                            Already have an account?
                        </LoginLink>
                    </LinkDivider>
                </LinkDividerWrapper>
            </Form>
        </Main>
    )
}
export default Register;