
import { login } from "../../../../features/auth/thunks";
import { ROUTES } from "../../../../constants/route-constants";
import { useAppDispatch } from "../../../../store";
import {
    useState,
    FormEvent,
    ChangeEvent,
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
    ForgotPasswordLink,
    LinkDividerWrapper,
    LoadingSubmitButton,
    SubmitButtonWrapper,
    ForgotPasswordLinkWrapper
} from "./styles";

const defaultData = {
    email: '',
    password: ''
}

const defaultErrors = {
    email: '',
    password: ''
}

function Login() {
    const dispatch = useAppDispatch();

    const isLoading = false;

    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState(defaultErrors);

    const disabled = Object.values(data).some(value => value === '') || Object.values(errors).some(error => error !== '');

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            email: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                email: 'Email is required!'
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
                password: 'Password is required!'
            });
            return;
        }

        setErrors({
            ...errors,
            password: ''
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(login(data));

        setData(defaultData);
    }

    return (
        <Main>
            <Form onSubmit={handleSubmit}>
                <Title>
                    Login
                </Title>
                <FieldsContainer>
                    <InputField
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
                        size="small"
                        name='password'
                        type='password'
                        label='Password'
                        value={data.password}
                        error={errors.password !== ''}
                        helperText={errors.password}
                        onChange={handleChangePassword}
                    />
                </FieldsContainer>
                <ForgotPasswordLinkWrapper>
                    <ForgotPasswordLink to={ROUTES.FORGOT_PASSWORD.path}>
                        Forgot password?
                    </ForgotPasswordLink>
                </ForgotPasswordLinkWrapper>
                <SubmitButtonWrapper>
                    {
                        isLoading ?
                            <LoadingSubmitButton />
                            :
                            <SubmitButton type='submit' variant="contained" disabled={disabled}>
                                Login
                            </SubmitButton>
                    }
                </SubmitButtonWrapper>
                <LinkDividerWrapper>
                    <LinkDivider>
                        <RegisterLink to={ROUTES.REGISTER.path}>
                            Don't have an account?
                        </RegisterLink>
                    </LinkDivider>
                </LinkDividerWrapper>
            </Form>
        </Main>
    )
}
export default Login;