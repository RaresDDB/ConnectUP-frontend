import { User } from "../../../types/user-types";
import { PaidEvent } from "../../../types/paid-event-types";

export interface EventHeaderProps {
    host: User;
    title: string;
    attendees: User[];
    paidEvent: PaidEvent | null;
}