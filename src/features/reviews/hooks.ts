import { Status } from '../../enums/status-enums';
import { useEffect } from 'react';
import { ReviewsFunctionality } from './enums';
import {
    reset
} from './slice';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';

const useReset = (
    functionality: ReviewsFunctionality,
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

const useStatus = (func: ReviewsFunctionality) => {
    const status = useAppSelector((state) => state.reviews.statuses[func]);
    const message = useAppSelector((state) => state.reviews.messages[func]);
    const severity = useAppSelector((state) => state.reviews.severities[func]);

    const isError = status === Status.Rejected;
    const isLoading = status === Status.Pending;
    const isSuccess = status === Status.Fulfilled;

    return { isLoading, isError, isSuccess, message, severity };
};

export const useCreateReview = () => {
    const { isLoading, isSuccess, isError } = useStatus(ReviewsFunctionality.CreateReview);
    useReset(ReviewsFunctionality.CreateReview, isSuccess || isError);
    return { isLoading };
}