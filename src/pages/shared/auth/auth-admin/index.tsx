import Loading from "../../../../components/loading";
import { ROUTES } from "../../../../constants/route-constants";
import { Severity } from "../../../../enums/severity-enums";
import { showToastr } from "../../../../features/toastr/slice";
import {
    Outlet,
    useNavigate
} from "react-router-dom";
import {
    useState,
    useEffect
} from "react";
import {
    useAppDispatch,
    useAppSelector
} from "../../../../store";

const AuthAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth.user);

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) {
            dispatch(
                showToastr({
                    message: "You need to authenticate first!",
                    severity: Severity.Error
                })
            );
            navigate(ROUTES.LOGIN.path);
            return;
        }
        setLoading(false);
    }, [user, navigate]);

    if (isLoading) {
        return (
            <Loading isLoading={isLoading} />
        )
    }

    return (
        <Outlet />
    )
}

export default AuthAdmin;