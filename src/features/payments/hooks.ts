import { Status } from '../../enums/status-enums';
import { useEffect } from 'react';
import { PaymentsFunctionality } from './enums';
import {
    reset
} from './slice';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';

const useReset = (
    functionality: PaymentsFunctionality,
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

const useStatus = (func: PaymentsFunctionality) => {
    const status = useAppSelector((state) => state.payments.statuses[func]);
    const message = useAppSelector((state) => state.payments.messages[func]);
    const severity = useAppSelector((state) => state.payments.severities[func]);

    const isError = status === Status.Rejected;
    const isLoading = status === Status.Pending;
    const isSuccess = status === Status.Fulfilled;

    return { isLoading, isError, isSuccess, message, severity };
};

export const useCreatePayment = () => {
    const { isLoading, isSuccess, isError } = useStatus(PaymentsFunctionality.CreatePayment);

    useReset(PaymentsFunctionality.CreatePayment, isSuccess || isError);
    
    return { isLoading };
}