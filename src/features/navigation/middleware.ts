import { navigate } from './slice';
import { RootState } from '../../store';
import { Middleware } from '@reduxjs/toolkit';
import { NAVIGATION_RULES } from './rules';

const navigationMiddleware: Middleware<{}, RootState> =
    store => next => action => {
        const result = next(action);

        const navigationRule = NAVIGATION_RULES[action.type];
        
        if (navigationRule) {
            store.dispatch(navigate(navigationRule));
        }

        return result;
    };

export default navigationMiddleware;