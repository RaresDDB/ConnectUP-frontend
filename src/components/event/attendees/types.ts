import { User } from "../../../types/user-types";

export interface EventAttendeesProps {
    host: User;
    attendees: User[];
}