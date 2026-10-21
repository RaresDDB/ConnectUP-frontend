import { Status } from '../../enums/status-enums';
import { useEffect } from 'react';
import { QuestionsFunctionality } from './enums';
import {
    reset
} from './slice';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';

const useReset = (
    functionality: QuestionsFunctionality,
    shouldReset: boolean
): void => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (shouldReset) {
            console.log(`[Debug] Resetting ${functionality}`);
            dispatch(reset(functionality));
        }
    }, [functionality, shouldReset, dispatch]);
};

const useStatus = (func: QuestionsFunctionality) => {
    const status = useAppSelector((state) => state.questions.statuses[func]);
    const message = useAppSelector((state) => state.questions.messages[func]);
    const severity = useAppSelector((state) => state.questions.severities[func]);

    const isError = status === Status.Rejected;
    const isLoading = status === Status.Pending;
    const isSuccess = status === Status.Fulfilled;

    return { isLoading, isError, isSuccess, message, severity };
};

export const useCreateQuestion = () => {
    const { isLoading, isSuccess, isError } = useStatus(QuestionsFunctionality.CreateQuestion);
    useReset(QuestionsFunctionality.CreateQuestion, isSuccess || isError);
    return { isLoading };
}