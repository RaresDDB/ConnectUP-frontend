import { Member } from "./member-types";

export type Review = {
    id: string;
    title: string;
    text: string;
    rating: number;
    postedAt: Date;
    eventId: string;
}
    & { member: Member; }