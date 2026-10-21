import { RootState } from '../../store';
import { createThunk } from '../thunks';
import { eventsService } from './service';
import { GetAllRequestPayload } from '../members/types';
import {
    CreateRequestPayload,
    AttendRequestPayload,
    GetByIdRequestPayload,
    UnattendRequestPayload,
    GetNearbyRequestPayload,
    DeleteByIdRequestPayload
} from './types';

export const createEvent = createThunk(
    'events/create',
    async (requestPayload: CreateRequestPayload) => {
        return await eventsService.create(requestPayload);
    }
)

export const attendEvent = createThunk(
    'events/attend',
    async (requestPayload: AttendRequestPayload, { getState }) => {
        const responsePayload = await eventsService.attend(requestPayload);

        const state = getState() as RootState;

        return {
            ...responsePayload,
            id: requestPayload.id,
            user: state.auth.user
        }
    }
)

export const unattendEvent = createThunk(
    'events/unattend',
    async (requestPayload: UnattendRequestPayload, { getState }) => {
        const responsePayload = await eventsService.unattend(requestPayload);

        const state = getState() as RootState;

        return {
            ...responsePayload,
            id: requestPayload.id,
            user: state.auth.user
        }
    }
)

export const getAllEvents = createThunk(
    'events/getAll',
    async () => {
        return await eventsService.getAll();
    }
)

export const getEventById = createThunk(
    'events/getById',
    async (requestPayload: GetByIdRequestPayload) => {
        return await eventsService.getById(requestPayload);
    }
)

export const getNearbyEvents = createThunk(
    'events/getNearby',
    async (requestPayload: GetNearbyRequestPayload) => {
        return await eventsService.getNearby(requestPayload);
    }
)

export const deleteEventById = createThunk(
    'events/deleteById',
    async (requestPayload: DeleteByIdRequestPayload) => {
        const responsePayload = await eventsService.deleteById(requestPayload);
        return {
            ...responsePayload,
            id: requestPayload.id
        }
    }
)

export const addEventToFavorites = createThunk(
    'events/addToFavorites',
    async (requestPayload: DeleteByIdRequestPayload) => {
        const responsePayload = await eventsService.addToFavorites(requestPayload);
        return {
            ...responsePayload,
            id: requestPayload.id
        }
    }
)

export const removeEventFromFavorites = createThunk(
    'events/removeFromFavorites',
    async (requestPayload: DeleteByIdRequestPayload) => {
        const responsePayload = await eventsService.removeFromFavorites(requestPayload);
        return {
            ...responsePayload,
            id: requestPayload.id
        }
    }
)