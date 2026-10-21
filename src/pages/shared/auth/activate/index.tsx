import Loading from '../../../../components/loading';
import UrlUtils from '../../../../utils/url-utils';
import { useActivate } from '../../../../features/auth/hooks';

function Activate() {
    const token = UrlUtils.getTokenFromUrl();

    const { isLoading } = useActivate(token);

    return (
        <Loading isLoading={isLoading} />
    )
}

export default Activate;