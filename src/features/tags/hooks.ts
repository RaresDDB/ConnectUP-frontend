import { reset } from './slice';
import { Status } from '../../enums/status-enums';
import { useEffect } from 'react';
import { getAllTags } from './thunks';
import { TagsFunctionality } from './enums';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';

const useReset = (
    functionality: TagsFunctionality,
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

const useStatus = (func: TagsFunctionality) => {
    const status = useAppSelector((state) => state.tags.statuses[func]);
    const message = useAppSelector((state) => state.tags.messages[func]);
    const severity = useAppSelector((state) => state.tags.severities[func]);

    const isError = status === Status.Rejected;
    const isLoading = status === Status.Pending;
    const isSuccess = status === Status.Fulfilled;

    return { isLoading, isError, isSuccess, message, severity };
};

export const useGetAllTags = () => {
    const dispatch = useAppDispatch();

    const { isLoading } = useStatus(TagsFunctionality.GetAllTags);

    const tags = useAppSelector((state) => state.tags.tags);

    useEffect(() => {
        dispatch(getAllTags());
    }, [dispatch]);

    return { tags, isLoading };
}