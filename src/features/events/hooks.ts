import { Status } from '../../enums/status-enums';
import { Position } from '../../types/position-types';
import { useEffect } from 'react';
import { EventsFunctionality } from './enums';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';
import {
    reset,
    selectEvents,
    selectMemberEvents
} from './slice';
import {
    getAllEvents,
    getEventById,
    getNearbyEvents
} from './thunks';

const useReset = (
    functionality: EventsFunctionality,
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

const useStatus = (func: EventsFunctionality) => {
    const status = useAppSelector((state) => state.events.statuses[func]);
    const message = useAppSelector((state) => state.events.messages[func]);
    const severity = useAppSelector((state) => state.events.severities[func]);

    const isError = status === Status.Rejected;
    const isLoading = status === Status.Pending;
    const isSuccess = status === Status.Fulfilled;

    return { isLoading, isError, isSuccess, message, severity };
};

export const useGetAllAdminEvents = () => {
    const dispatch = useAppDispatch();

    const { isLoading, isSuccess, isError } = useStatus(EventsFunctionality.GetAllEvents);

    const events = useAppSelector((state) => selectEvents(state));

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    useReset(EventsFunctionality.GetAllEvents, isSuccess || isError);

    return { events, isLoading };
}

export const useGetAllMemberEvents = () => {
    const dispatch = useAppDispatch();

    const { isLoading } = useStatus(EventsFunctionality.GetAllEvents);

    const events = useAppSelector((state) => selectMemberEvents(state));

    useEffect(() => {
        dispatch(getAllEvents());
        return () => {
            dispatch(reset(EventsFunctionality.GetAllEvents));
        };
    }, [dispatch]);

    return { events, isLoading };
}

export const useGetEventById = (id?: string) => {
    const dispatch = useAppDispatch();

    const { isLoading, isSuccess, isError } = useStatus(EventsFunctionality.GetAllEvents);

    const event = useAppSelector((state) => state.events.event);

    useEffect(() => {
        id && dispatch(getEventById({ id }));
    }, [id, dispatch]);

    useReset(EventsFunctionality.GetAllEvents, isSuccess || isError);

    return { event, isLoading };
}

export const useGetNearbyEvents = (radius: number, position: Position) => {
    const dispatch = useAppDispatch();

    const { isLoading } = useStatus(EventsFunctionality.GetNearbyEvents);

    const events = useAppSelector(selectMemberEvents);

    useEffect(() => {
        dispatch(getNearbyEvents({ radius, ...position }));
        return () => {
            dispatch(reset(EventsFunctionality.GetNearbyEvents));
        };
    }, [radius, position.lat, position.lng, dispatch]);

    return { events, isLoading };
}

export const useCreateEvent = () => {
    const { isLoading, isSuccess, isError } = useStatus(EventsFunctionality.CreateEvent);
    useReset(EventsFunctionality.CreateEvent, isSuccess || isError);
    return { isLoading };
}

export const useAttendEvent = () => {
    const { isLoading, isSuccess, isError } = useStatus(EventsFunctionality.AttendEvent);
    useReset(EventsFunctionality.AttendEvent, isSuccess || isError);
    return { isLoading };
}

export const useUnattendEvent = () => {
    const { isLoading, isSuccess, isError } = useStatus(EventsFunctionality.UnattendEvent);
    useReset(EventsFunctionality.UnattendEvent, isSuccess || isError);
    return { isLoading };
}

export const useDeleteEventById = () => {
    const { isLoading, isSuccess, isError } = useStatus(EventsFunctionality.DeleteEventById);
    useReset(EventsFunctionality.DeleteEventById, isSuccess || isError);
    return { isLoading };
}

export const useAddEventToFavorites = () => {
    const { isLoading, isSuccess, isError } = useStatus(EventsFunctionality.AddEventToFavorites);
    useReset(EventsFunctionality.AddEventToFavorites, isSuccess || isError);
    return { isLoading };
}

export const useRemoveEventFromFavorites = () => {
    const { isLoading, isSuccess, isError } = useStatus(EventsFunctionality.RemoveEventFromFavorites);
    useReset(EventsFunctionality.RemoveEventFromFavorites, isSuccess || isError);
    return { isLoading };
}