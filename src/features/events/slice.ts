import initialState from './state';
import { User } from '../../types/user-types';
import { Status } from '../../enums/status-enums';
import { RootState } from '../../store';
import { createReview } from '../reviews/thunks';
import { EventsFunctionality } from './enums';
import {
    Event,
    MemberEvent
} from '../../types/event-types';
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import {
    EventsState,
    CreateResponsePayload,
    GetAllResponsePayload,
    AttendResponsePayload,
    GetByIdResponsePayload,
    UnattendResponsePayload,
    GetNearbyResponsePayload,
    DeleteByIdResponsePayload,
    AddEventToFavoritesResponsePayload
} from './types';
import * as thunks from './thunks';

const stateUpdates = {
    createEvent: (state: EventsState, payload: CreateResponsePayload) => {
        state.events.push(payload.event);
    },
    // TODO proper types
    attendEvent: (state: EventsState, payload: AttendResponsePayload & { id: string } & { user: Omit<User, 'password'> }) => {
        state.events = state.events.map(event =>
            event.id === payload.id
                ? { ...event, attended: true, attendees: [...event.attendees, payload.user] }
                : event
        );
    },
    unattendEvent: (state: EventsState, payload: UnattendResponsePayload & { id: string } & { user: Omit<User, 'password'> }) => {
        state.events = state.events.map(event =>
            event.id === payload.id
                ? {
                    ...event,
                    attended: false,
                    attendees: event.attendees.filter(attendee => attendee.id !== payload.user.id)
                }
                : event
        );
    },
    getAllEvents: (state: EventsState, payload: GetAllResponsePayload) => {
        state.events = payload.events;
    },
    getEventById: (state: EventsState, payload: GetByIdResponsePayload) => {
        state.event = payload;
    },
    getNearbyEvents: (state: EventsState, payload: GetNearbyResponsePayload) => {
        state.events = payload.events;
    },
    deleteEventById: (state: EventsState, payload: { id: string } & DeleteByIdResponsePayload) => {
        state.events = state.events.filter((event) => event.id !== payload.id);
    },
    addEventToFavorites: (state: EventsState, payload: AddEventToFavoritesResponsePayload & { id: string }) => {
        state.events = state.events.map(event =>
            event.id === payload.id
                ? { ...event, favorite: true }
                : event
        );
    },
    removeEventFromFavorites: (state: EventsState, payload: AddEventToFavoritesResponsePayload & { id: string }) => {
        state.events = state.events.map(event =>
            event.id === payload.id
                ? { ...event, favorite: false }
                : event
        );
    }
} as const;

const createStatusHandlers = (functionality: EventsFunctionality) => ({
    pending: (state: EventsState) => {
        state.statuses[functionality] = Status.Pending;
    },
    fulfilled: (state: EventsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Fulfilled;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;

        const stateUpdate = stateUpdates[functionality];

        if (stateUpdate) {
            stateUpdate(state, payload);
        }
    },
    rejected: (state: EventsState, { payload }: PayloadAction<any>) => {
        state.statuses[functionality] = Status.Rejected;
        state.messages[functionality] = payload.message ?? null;
        state.severities[functionality] = payload.severity ?? null;
    }
});

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        reset: (state, { payload }: PayloadAction<EventsFunctionality>) => {
            state.messages[payload] = null;
            state.statuses[payload] = null;
            state.severities[payload] = null;
        }
    },
    extraReducers: (builder) => {
        Object.values(EventsFunctionality).forEach(functionality => {
            const handlers = createStatusHandlers(functionality);

            const thunk = thunks[functionality];

            if (thunk) {
                builder
                    .addCase(thunk.pending, handlers.pending)
                    .addCase(thunk.fulfilled, handlers.fulfilled)
                    .addCase(thunk.rejected, handlers.rejected);
            }
        });

        builder.addMatcher(
            createReview.fulfilled.match,
            (state, action) => {
                const review = action.payload.review;

                const event = state.events.find(event => event.id === review.eventId);
                if (event) {
                    if (!event.reviews) {
                        event.reviews = [];
                    }
                    event.reviews.push(review);
                }
            }
        );
    }
});

export const selectEvents = (state: RootState): Event[] => state.events.events as Event[];
export const selectMemberEvents = (state: RootState): MemberEvent[] => state.events.events as MemberEvent[];

export const { reset } = eventsSlice.actions;
export default eventsSlice.reducer;