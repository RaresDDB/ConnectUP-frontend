import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import Toastr from '../../../components/toastr';
import { reset } from '../../../features/navigation/slice';
import {
    Outlet,
    useNavigate
} from 'react-router-dom';
import {
    Fragment,
    useEffect
} from 'react';
import {
    useAppDispatch,
    useAppSelector
} from '../../../store';

function Global() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const url = useAppSelector(state => state.navigation.url);

    useEffect(() => {
        if (url) {
            navigate(url);
            dispatch(reset());
        }
    }, [url, navigate]);

    return (
        <Fragment>
            <Navbar />
            <Outlet />
            <Footer />
            <Toastr />
        </Fragment>
    )
}

export default Global;