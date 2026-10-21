import { Member } from "./member-types";

export type Question = {
    id: string;
    title: string;
    text: string;
    postedAt: Date;
    eventId: string;
}
    & { member: Member; }