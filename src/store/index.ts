import authReducer from '../features/auth/slice';
import tagsReducer from '../features/tags/slice';
import toastrReducer from '../features/toastr/slice';
import searchReducer from '../features/search/slice';
import eventsReducer from '../features/events/slice';
import membersReducer from '../features/members/slice';
import reviewsReducer from '../features/reviews/slice';
import reviewsListener from '../features/reviews/middleware';
import paymentsReducer from '../features/payments/slice';
import questionsReducer from '../features/questions/slice';
import geocodingReducer from '../features/geocoding/slice';
import toastrMiddleware from '../features/toastr/middleware';
import navigationReducer from '../features/navigation/slice';
import questionsListener from '../features/questions/middleware';
import navigationMiddleware from '../features/navigation/middleware';
import {
    configureStore,
    combineReducers,
    TypedStartListening
} from '@reduxjs/toolkit';
import {
    useDispatch,
    useSelector,
    TypedUseSelectorHook
} from 'react-redux';

const rootReducer = combineReducers({
    auth: authReducer,
    tags: tagsReducer,
    toastr: toastrReducer,
    search: searchReducer,
    events: eventsReducer,
    members: membersReducer,
    reviews: reviewsReducer,
    payments: paymentsReducer,
    geocoding: geocodingReducer,
    questions: questionsReducer,
    navigation: navigationReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(reviewsListener.middleware)
            .prepend(questionsListener.middleware)
            .concat(navigationMiddleware)
            .concat(toastrMiddleware)
});

export default store;