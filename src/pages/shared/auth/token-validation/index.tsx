
import Loading from "../../../../components/loading";
import UrlUtils from "../../../../utils/url-utils";
import { TOKEN_VALIDATION } from "./constants";
import {
    useState,
    useEffect
} from "react";
import {
    Outlet,
    useNavigate,
    useLocation
} from "react-router-dom";

const TokenValidation = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const token = UrlUtils.getTokenFromUrl();

    useEffect(() => {
        const validateToken = () => {
            if (token) {
                setIsLoading(false);
                return;
            }

            const redirect = Object.entries(TOKEN_VALIDATION.REDIRECTS).find(
                ([path]) => location.pathname.includes(path)
            );

            navigate(redirect?.[1] || TOKEN_VALIDATION.REDIRECTS.DEFAULT);

            setIsLoading(false);
        };

        validateToken();
    }, [token, navigate, location.pathname]);

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    }

    return <Outlet />;
};

export default TokenValidation;