import { ROUTES } from '../../constants/route-constants';
import { ACTIONS } from '../constants';
import { NavigationRules } from './types';

export const NAVIGATION_RULES: NavigationRules = {
    [ACTIONS.REGISTER.SUCCESS]: { url: ROUTES.LOGIN.path },

    [ACTIONS.ACTIVATE.SUCCESS]: { url: ROUTES.LOGIN.path, replace: true },
    [ACTIONS.ACTIVATE.FAILURE]: { url: ROUTES.REGISTER.path, replace: true },

    [ACTIONS.LOGIN.SUCCESS]: { url: ROUTES.HOME.path, replace: true },

    [ACTIONS.RESET_PASSWORD.SUCCESS]: { url: ROUTES.LOGIN.path, replace: true },

    [ACTIONS.LOGOUT.SUCCESS]: { url: ROUTES.LOGIN.path, replace: true },
    [ACTIONS.LOGOUT.FAILURE]: { url: ROUTES.LOGIN.path, replace: true },

    [ACTIONS.CONFIRM_CHANGE_EMAIL.SUCCESS]: { url: ROUTES.LOGIN.path, replace: true },
    [ACTIONS.CONFIRM_CHANGE_EMAIL.FAILURE]: { url: ROUTES.LOGIN.path, replace: true },

    [ACTIONS.CONFIRM_CHANGE_PASSWORD.SUCCESS]: { url: ROUTES.LOGIN.path, replace: true },
    [ACTIONS.CONFIRM_CHANGE_PASSWORD.FAILURE]: { url: ROUTES.LOGIN.path, replace: true },

    [ACTIONS.CREATE_EVENT.SUCCESS]: { url: ROUTES.MANAGE_EVENTS.path }
};