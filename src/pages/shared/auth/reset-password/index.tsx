import UrlUtils from "../../../../utils/url-utils";
import FormUtils from "../../../../utils/form-utils";
import { ROUTES } from "../../../../constants/route-constants";
import { resetPassword } from "../../../../features/auth/thunks";
import { useAppDispatch } from "../../../../store";
import { useResetPassword } from "../../../../features/auth/hooks";
import {
    newPasswordErrors,
    confirmPasswordErrors
} from "./errors";
import {
    useState,
    FormEvent,
    ChangeEvent
} from "react";
import {
    Form,
    Main,
    Title,
    InputField,
    LinkDivider,
    SubmitButton,
    RegisterLink,
    FieldsContainer,
    LinkDividerWrapper,
    SubmitButtonWrapper
} from "./styles";

const defaultData = {
    newPassword: '',
    confirmPassword: ''
}

const defaultErrors = {
    newPassword: '',
    confirmPassword: ''
}

function ResetPassword() {
    const dispatch = useAppDispatch();

    const token = UrlUtils.getTokenFromUrl();

    const { isLoading } = useResetPassword();

    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState(defaultErrors);

    const isDisabled = FormUtils.isInvalid(data, errors);

    const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            newPassword: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                newPassword: newPasswordErrors.required
            });
            return;
        }

        if (e.target.value.length < 6) {
            setErrors({
                ...errors,
                newPassword: newPasswordErrors.minLength
            });
            return;
        }

        if (e.target.value.length > 30) {
            setErrors({
                ...errors,
                newPassword: newPasswordErrors.maxLength
            });
            return;
        }

        if (e.target.value.trim() === '') {
            setErrors({
                ...errors,
                newPassword: newPasswordErrors.onlySpaces
            });
            return;
        }

        if (!/[a-z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                newPassword: newPasswordErrors.lowerCaseLetter
            });
            return;
        }

        if (!/[A-Z]/.test(e.target.value)) {
            setErrors({
                ...errors,
                newPassword: newPasswordErrors.upperCaseLetter
            });
            return;
        }

        if (!/\d/.test(e.target.value)) {
            setErrors({
                ...errors,
                newPassword: newPasswordErrors.digit
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
                confirmPassword: confirmPasswordErrors.required
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

        if (token) {
            dispatch(
                resetPassword({
                    ...data,
                    token
                })
            );
        }

        setData(defaultData);
    }

    return (
        <Main>
            <Form onSubmit={handleSubmit}>
                <Title>
                    Reset password
                </Title>
                <FieldsContainer>
                    <InputField
                        size="small"
                        name='newPassword'
                        type='password'
                        label='New password'
                        value={data.newPassword}
                        error={errors.newPassword !== ''}
                        helperText={errors.newPassword}
                        onChange={handleChangeNewPassword}
                    />
                    <InputField
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
                    <SubmitButton
                        type='submit'
                        variant='contained'
                        disabled={isDisabled}
                        loading={isLoading}
                    >
                        Reset password
                    </SubmitButton>
                </SubmitButtonWrapper>
                <LinkDividerWrapper>
                    <LinkDivider>
                        <RegisterLink to={ROUTES.LOGIN.path}>
                            Remembered your password?
                        </RegisterLink>
                    </LinkDivider>
                </LinkDividerWrapper>
            </Form>
        </Main>
    )
}
export default ResetPassword;