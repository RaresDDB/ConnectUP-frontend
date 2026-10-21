export interface Data extends Record<string, any> {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    tags: string[];
    username: string;
    birthDate: Date | null;
    gender: string;
    avatar: File | null;
}