import { Tag } from "./tag-types";
import { User } from "./user-types";
import { Review } from "./review-types";
import { Question } from "./question-types";
import { PaidEvent } from "./paid-event-types";

export type Event = {
    id: string;
    title: string;
    address: string;
    description: string;
    lat: number;
    lng: number;
    imageUri: string;
    startDate: Date;
    endDate: Date | null;
    createdAt: Date;
    host: User;
    gallery: string[];
    attendees: User[];
    tags: Tag[];
    reviews: Review[],
    questions: Question[],
    paidEvent: PaidEvent | null;
}

export type AttendanceStats = {
    byAge: {
        'Under 18': number;
        '18-25': number;
        '26-35': number;
        '36-49': number;
        '50+': number;
    };
    byGender: {
        'Male': number;
        'Female': number;
        'Other': number;
    };
    topTags: string[];
};

export type MemberEvent = Event & {
    favorite: boolean;
    attended: boolean;
};

export type UnionEvent = Event | MemberEvent;

export const isMemberEvent = (event: UnionEvent): event is MemberEvent => {
    return 'favorite' in event && 'attended' in event;
}