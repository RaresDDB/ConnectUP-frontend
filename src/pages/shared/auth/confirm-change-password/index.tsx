import Loading from '../../../../components/loading';
import UrlUtils from '../../../../utils/url-utils';
import { useConfirmChangePassword } from '../../../../features/auth/hooks';

function ConfirmChangePassword() {
    const token = UrlUtils.getTokenFromUrl();

    const { isLoading } = useConfirmChangePassword(token);

    return (
        <Loading isLoading={isLoading} />
    )
}

export default ConfirmChangePassword;