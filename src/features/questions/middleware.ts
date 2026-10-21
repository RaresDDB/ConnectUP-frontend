import { getEventById } from '../events/thunks';
import { createQuestion } from './thunks';
import { AppStartListening } from '../../store';
import { createListenerMiddleware } from '@reduxjs/toolkit';

export const questionsListener = createListenerMiddleware();

export const startAppListening = questionsListener.startListening as AppStartListening;

startAppListening({
    matcher: createQuestion.fulfilled.match,
    effect: async (action, listenerApi) => {
        const question = action.payload.question;

        await listenerApi.dispatch(
            getEventById({
                id: question.eventId
            })
        );
    }
});

export default questionsListener;