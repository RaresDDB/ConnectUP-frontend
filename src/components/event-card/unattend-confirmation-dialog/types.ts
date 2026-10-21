export interface UnattendConfirmationDialogProps {
    isOpen: boolean;
    eventTitle: string;
    onClose: () => void;
    onConfirm: () => void;
}