import PaymentForm from './payment-form';
import { PaymentModalProps } from './types';
import {
    Dialog,
    DialogTitle
} from '@mui/material';

function PaymentModal(props: PaymentModalProps) {
    const {
        price,
        isOpen,
        onClose,
        eventId,
        currency,
        onSuccess
    } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            disableEscapeKeyDown
        >
            <DialogTitle>Complete Payment</DialogTitle>
            <PaymentForm
                price={price}
                eventId={eventId}
                onClose={onClose}
                currency={currency}
                onSuccess={onSuccess}
            />
        </Dialog>
    );
}

export default PaymentModal;