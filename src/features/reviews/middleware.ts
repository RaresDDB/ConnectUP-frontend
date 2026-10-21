import { createReview } from './thunks';
import { getEventById } from '../events/thunks';
import { AppStartListening } from '../../store';
import { createListenerMiddleware } from '@reduxjs/toolkit';

export const reviewsListener = createListenerMiddleware();

export const startAppListening = reviewsListener.startListening as AppStartListening;

startAppListening({
    matcher: createReview.fulfilled.match,
    effect: async (action, listenerApi) => {
        const review = action.payload.review;

        await listenerApi.dispatch(
            getEventById({
                id: review.eventId
            })
        );
    }
});

export default reviewsListener;