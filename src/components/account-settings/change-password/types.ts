export interface Data extends Record<string, any> {
    newPassword: string;
    currentPassword: string;
    confirmPassword: string;
}