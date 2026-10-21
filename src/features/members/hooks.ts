import { reset } from './slice';
import { Status } from '../../enums/status-enums';
import { useEffect } from 'react';
import { getAllMembers } from './thunks';
import { MembersFunctionality } from './enums';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';

const useReset = (
    functionality: MembersFunctionality,
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

const useStatus = (func: MembersFunctionality) => {
    const status = useAppSelector((state) => state.members.statuses[func]);
    const message = useAppSelector((state) => state.members.messages[func]);
    const severity = useAppSelector((state) => state.members.severities[func]);

    const isError = status === Status.Rejected;
    const isLoading = status === Status.Pending;
    const isSuccess = status === Status.Fulfilled;

    return { isLoading, isError, isSuccess, message, severity };
};

export const useGetAllMembers = () => {
    const dispatch = useAppDispatch();

    const { isLoading, isSuccess, isError } = useStatus(MembersFunctionality.GetAllMembers);

    const members = useAppSelector((state) => state.members.members);

    useEffect(() => {
        dispatch(getAllMembers());
    }, [dispatch]);

    useReset(MembersFunctionality.GetAllMembers, isSuccess || isError);

    return { members, isLoading };
}