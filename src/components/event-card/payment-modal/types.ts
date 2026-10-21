export interface PaymentModalProps {
    price: number;
    isOpen: boolean;
    eventId: string;
    onClose: () => void;
    currency: string;
    onSuccess: () => void;
}