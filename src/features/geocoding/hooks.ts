import { reset } from './slice';
import { Status } from '../../enums/status-enums';
import { useEffect } from 'react';
import { getCoordsByAddress } from './thunks';
import { GeocodingFunctionality } from './enums';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';

const useReset = (
    functionality: GeocodingFunctionality,
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

const useStatus = (func: GeocodingFunctionality) => {
    const status = useAppSelector((state) => state.geocoding.statuses[func]);
    const message = useAppSelector((state) => state.geocoding.messages[func]);
    const severity = useAppSelector((state) => state.geocoding.severities[func]);

    const isError = status === Status.Rejected;
    const isLoading = status === Status.Pending;
    const isSuccess = status === Status.Fulfilled;

    return { isLoading, isError, isSuccess, message, severity };
};

export const useGetCoordsByAddress = (address: string) => {
    const dispatch = useAppDispatch();

    const { isLoading, isSuccess, isError } = useStatus(GeocodingFunctionality.GetCoordsByAddress);

    const { lat, lng } = useAppSelector((state) => state.geocoding);

    useEffect(() => {
        address && dispatch(getCoordsByAddress({ address }));
    }, [address, dispatch]);

    useReset(GeocodingFunctionality.GetCoordsByAddress, isSuccess || isError);

    return { lat, lng, isLoading };
}