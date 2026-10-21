import { Data } from "./types";
import { ROUTES } from "../../../../constants/route-constants";
import { emailErrors } from "./errors";
import { useAppDispatch } from "../../../../store";
import { forgotPassword } from "../../../../features/auth/thunks";
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
    LoadingSubmitButton,
    SubmitButtonWrapper
} from "./styles";

const defaultData = {
    email: ''
}

const defaultErrors = {
    email: ''
}

function ForgotPassword() {
    const dispatch = useAppDispatch();

    const isLoading = false;

    const [data, setData] = useState<Data>(defaultData);
    const [errors, setErrors] = useState(defaultErrors);

    const disabled = Object.values(errors).some(error => error !== '') || Object.values(data).some(value => value === '');

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            email: e.target.value
        });

        if (e.target.value === '') {
            setErrors({
                ...errors,
                email: emailErrors.required
            });
            return;
        }

        setErrors({
            ...errors,
            email: ''
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(
            forgotPassword(data)
        );

        setData(defaultData);
    }

    return (
        <Main>
            <Form onSubmit={handleSubmit}>
                <Title>
                    Forgot password
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
                </FieldsContainer>
                <SubmitButtonWrapper>
                    {
                        isLoading ?
                            <LoadingSubmitButton />
                            :
                            <SubmitButton type='submit' variant="contained" disabled={disabled}>
                                Find password
                            </SubmitButton>
                    }
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
export default ForgotPassword;