import FormUtils from "../../../utils/form-utils";
import { Data } from "./types";
import { ERRORS } from "../../../constants/error-constants";
import { Severity } from "../../../enums/severity-enums";
import { TextField } from "@mui/material";
import { showToastr } from "../../../features/toastr/slice";
import { useAppDispatch } from "../../../store";
import {
    useState,
    FormEvent,
    ChangeEvent
} from "react";
import {
    Form,
    Title,
    SubmitButton,
    FieldsContainer,
    LoadingSubmitButton,
    SubmitButtonWrapper
} from "./styles";
import { changePassword } from "../../../features/auth/thunks";

const defaultData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
}

const defaultErrors = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
}

function ChangePassword() {
    const dispatch = useAppDispatch();

    const isLoading = false;

    const [data, setData] = useState<Data>(defaultData);
    const [errors, setErrors] = useState(defaultErrors);

    const isDisabled = FormUtils.isInvalid(data, errors);

    const handleChangeCurrentPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            currentPassword: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                currentPassword: ERRORS.password.required
            });
            return;
        }

        if (e.target.value.length < 6) {
            setErrors({
                ...errors,
                currentPassword: ERRORS.password.minLength
            });
            return;
        }

        if (e.target.value.length > 30) {
            setErrors({
                ...errors,
                currentPassword: ERRORS.password.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                currentPassword: ERRORS.password.onlySpaces
            });
            return;
        }

        if (!/[a-z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                currentPassword: ERRORS.password.lowerCaseLetter
            });
            return;
        }

        if (!/[A-Z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                currentPassword: ERRORS.password.upperCaseLetter
            });
            return;
        }

        if (!/\d/.test(e.target.value)) {
            setErrors({
                ...errors,
                currentPassword: ERRORS.password.digit
            });
            return;
        }

        setErrors({
            ...errors,
            currentPassword: ''
        });
    }

    const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            newPassword: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                newPassword: ERRORS.password.required
            });
            return;
        }

        if (e.target.value.length < 6) {
            setErrors({
                ...errors,
                newPassword: ERRORS.password.minLength
            });
            return;
        }

        if (e.target.value.length > 30) {
            setErrors({
                ...errors,
                newPassword: ERRORS.password.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                newPassword: ERRORS.password.onlySpaces
            });
            return;
        }

        if (!/[a-z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                newPassword: ERRORS.password.lowerCaseLetter
            });
            return;
        }

        if (!/[A-Z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                newPassword: ERRORS.password.upperCaseLetter
            });
            return;
        }

        if (!/\d/.test(e.target.value)) {
            setErrors({
                ...errors,
                newPassword: ERRORS.password.digit
            });
            return;
        }

        setErrors({
            ...errors,
            newPassword: ''
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.newPassword !== data.confirmPassword) {
            dispatch(
                showToastr({
                    message: ERRORS.general.passwordsNotTheSame,
                    severity: Severity.Error,
                })
            );
            return;
        }

        dispatch(
            changePassword({
                newPassword: data.newPassword,
                currentPassword: data.currentPassword
            })
        )

        setData(defaultData);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Title>
                Change password
            </Title>
            <FieldsContainer>
                <TextField
                    fullWidth
                    required
                    size="small"
                    name='currentPassword'
                    type='password'
                    label='Current password'
                    value={data.currentPassword}
                    error={errors.currentPassword !== ''}
                    helperText={errors.currentPassword}
                    onChange={handleChangeCurrentPassword}
                />
                <TextField
                    fullWidth
                    required
                    size="small"
                    name='newPassword'
                    type='password'
                    label='New password'
                    value={data.newPassword}
                    error={errors.newPassword !== ''}
                    helperText={errors.newPassword}
                    onChange={handleChangeNewPassword}
                />
                <TextField
                    fullWidth
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
            </FieldsContainer>
            <SubmitButtonWrapper>
                {
                    isLoading ?
                        <LoadingSubmitButton />
                        :
                        <SubmitButton type='submit' variant="contained" disabled={isDisabled}>
                            Change password
                        </SubmitButton>
                }
            </SubmitButtonWrapper>
        </Form>
    )
}

export default ChangePassword;