import Home from '../pages/shared/home';
import Event from '../pages/shared/event';
import Login from '../pages/shared/auth/login';
import Global from '../pages/shared/global';
import Events from '../pages/member/events';
import Logout from '../pages/shared/auth/logout';
import Register from '../pages/shared/auth/register';
import Activate from '../pages/shared/auth/activate';
import AuthAdmin from '../pages/shared/auth/auth-admin';
import CreateEvent from '../pages/admin/create-event';
import NearbyEvents from '../pages/member/nearby-events';
import ManageEvents from '../pages/admin/manage-events';
import ResetPassword from '../pages/shared/auth/reset-password';
import ForgotPassword from '../pages/shared/auth/forgot-password';
import TokenValidation from '../pages/shared/auth/token-validation';
import AccountSettings from '../pages/shared/auth/account-settings';
import ConfirmChangeEmail from '../pages/shared/auth/confirm-change-email';
import ConfirmChangePassword from '../pages/shared/auth/confirm-change-password';
import { ROUTES } from '../constants/route-constants';
import {
    Route,
    Routes,
    BrowserRouter
} from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.GLOBAL.path} element={<Global />}>
                    <Route path={ROUTES.HOME.path} element={<Home />} />
                    <Route path={ROUTES.LOGIN.path} element={<Login />} />
                    <Route path={ROUTES.REGISTER.path} element={<Register />} />
                    <Route path={ROUTES.FORGOT_PASSWORD.path} element={<ForgotPassword />} />

                    <Route path={ROUTES.ACTIVATE.path} element={<TokenValidation />} >
                        <Route path={ROUTES.EMPTY.path} element={<Activate />} />
                    </Route>

                    <Route path={ROUTES.RESET_PASSWORD.path} element={<TokenValidation />} >
                        <Route path={ROUTES.EMPTY.path} element={<ResetPassword />} />
                    </Route>

                    <Route path={ROUTES.CONFIRM_CHANGE_EMAIL.path} element={<TokenValidation />} >
                        <Route path={ROUTES.EMPTY.path} element={<ConfirmChangeEmail />} />
                    </Route>

                    <Route path={ROUTES.CONFIRM_CHANGE_PASSWORD.path} element={<TokenValidation />} >
                        <Route path={ROUTES.EMPTY.path} element={<ConfirmChangePassword />} />
                    </Route>

                    <Route path={ROUTES.LOGOUT.path} element={<Logout />} />
                    <Route path={ROUTES.ACCOUNT_SETTINGS.path} element={<AccountSettings />} />

                    <Route path={ROUTES.AUTH_ADMIN.path} element={<AuthAdmin />} >
                        <Route path={ROUTES.CREATE_EVENT.path} element={<CreateEvent />} />
                        <Route path={ROUTES.MANAGE_EVENTS.path} element={<ManageEvents />} />
                    </Route>

                    <Route path={ROUTES.EVENT.path} element={<Event />} />
                    <Route path={ROUTES.EVENTS.path} element={<Events />} />
                    <Route path={ROUTES.NEARBY_EVENTS.path} element={<NearbyEvents />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;