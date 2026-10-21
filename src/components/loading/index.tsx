import CircularSpinner from '../circular-spinner';
import { Container } from './styles';
import { LoadingProps } from './types';

function Loading(props: LoadingProps) {
    const { size, isLoading } = props;

    return (
        <Container>
            {
                isLoading
                    ? <CircularSpinner size={size ?? 75} color="primary" />
                    : undefined
            }
        </Container>
    )
}

export default Loading;