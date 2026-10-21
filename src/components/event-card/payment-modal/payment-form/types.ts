export interface PaymentFormProps {
    price: number;
    eventId: string;
    onClose: () => void;
    currency: string;
    onSuccess: () => void;
}