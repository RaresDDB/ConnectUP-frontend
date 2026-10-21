import { RootState } from '../../store';
import { showToastr } from './slice';
import { Middleware } from '@reduxjs/toolkit';
import { TOASTR_ACTIONS } from './actions';

const toastrMiddleware: Middleware<{}, RootState> =
    store => next => action => {
        const result = next(action);

        // TODO de rezolvat action
        if (TOASTR_ACTIONS.includes(action.type)) {
            store.dispatch(showToastr({
                message: action.payload.message,
                severity: action.payload.severity
            }));
        }

        return result;
    };

export default toastrMiddleware;