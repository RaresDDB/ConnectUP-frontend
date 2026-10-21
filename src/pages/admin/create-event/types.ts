export interface Data extends Record<string, any> {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    hostId: string;
    tags: string[];
    isPaid: boolean;
    price: number;
    currency: string;
    maxAttendees: number;
}