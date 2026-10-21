
import { Role } from '../../../enums/role-enums';
import { ROUTES } from '../../../constants/route-constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store';

function Home() {
    console.log("RENDER HOME");

    const navigate = useNavigate();

    const user = useAppSelector(state => state.auth.user);

    useEffect(() => {
        if (!user) {
            navigate(ROUTES.LOGIN.path);
            return;
        }
        if (user.role.name === Role.Admin) {
            navigate(ROUTES.MANAGE_EVENTS.path);
            return;
        }
        if (user.role.name === Role.Member) {
            navigate(ROUTES.NEARBY_EVENTS.path);
            return;
        }
    }, []);

    if (!user) {
        return null;
    }
}

export default Home;