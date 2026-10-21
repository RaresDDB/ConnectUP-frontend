import Loading from '../../../../components/loading';
import UrlUtils from '../../../../utils/url-utils';
import { useConfirmChangeEmail } from '../../../../features/auth/hooks';

function ConfirmChangeEmail() {
    const token = UrlUtils.getTokenFromUrl();

    const { isLoading } = useConfirmChangeEmail(token);

    return (
        <Loading isLoading={isLoading} />
    )
}

export default ConfirmChangeEmail;