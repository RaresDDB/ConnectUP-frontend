export interface Data extends Record<string, any> {
    firstName: string;
    lastName: string;
    tags: string[];
    username: string;
    birthDate: Date;
    gender: string;
    avatar: File | null;
}