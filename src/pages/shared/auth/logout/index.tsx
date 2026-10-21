import Loading from '../../../../components/loading';
import { useLogout } from '../../../../features/auth/hooks';

function Logout() {
    const { isLoading } = useLogout();

    return (
        <Loading isLoading={isLoading} />
    )
}

export default Logout;