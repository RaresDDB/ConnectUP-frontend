import FormUtils from "../../../utils/form-utils";
import { Data } from "./types";
import { ERRORS } from "../../../constants/error-constants";
import { Severity } from "../../../enums/severity-enums";
import { TextField } from "@mui/material";
import { showToastr } from "../../../features/toastr/slice";
import { useAppDispatch, useAppSelector } from "../../../store";
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
import { changeEmail } from "../../../features/auth/thunks";

const defaultData = {
    newEmail: '',
}

const defaultErrors = {
    newEmail: ''
}

function ChangeEmail() {
    const dispatch = useAppDispatch();

    const isLoading = false;

    const user = useAppSelector(state => state.auth.user);

    const [data, setData] = useState<Data>(defaultData);
    const [errors, setErrors] = useState(defaultErrors);

    const isDisabled = FormUtils.isInvalid(data, errors);

    const handleChangeNewEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            newEmail: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                newEmail: ERRORS.email.required
            });
            return;
        }

        if (e.target.value.length < 6) {
            setErrors({
                ...errors,
                newEmail: ERRORS.email.minLength
            });
            return;
        }

        if (e.target.value.length > 100) {
            setErrors({
                ...errors,
                newEmail: ERRORS.email.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                newEmail: ERRORS.email.onlySpaces
            });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
            setErrors({
                ...errors,
                newEmail: ERRORS.email.invalid
            });
            return;
        }

        setErrors({
            ...errors,
            newEmail: ''
        });
    }

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

        dispatch(
            changeEmail(data)
        )

        setData(defaultData);
    }

    if (!user) {
        return null;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Title>
                Change email
            </Title>
            <FieldsContainer>
                <TextField
                    fullWidth
                    required
                    size="small"
                    name='currentEmail'
                    type='email'
                    label='Current email'
                    disabled
                    value={user.email}
                />
                <TextField
                    fullWidth
                    required
                    size="small"
                    name='newEmail'
                    type='email'
                    label='New email'
                    value={data.newEmail}
                    error={errors.newEmail !== ''}
                    helperText={errors.newEmail}
                    onChange={handleChangeNewEmail}
                />
            </FieldsContainer>
            <SubmitButtonWrapper>
                {
                    isLoading ?
                        <LoadingSubmitButton />
                        :
                        <SubmitButton type='submit' variant="contained" disabled={isDisabled}>
                            Change email
                        </SubmitButton>
                }
            </SubmitButtonWrapper>
        </Form>
    )
}

export default ChangeEmail;