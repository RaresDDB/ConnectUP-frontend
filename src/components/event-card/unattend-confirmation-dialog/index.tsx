import { UnattendConfirmationDialogProps } from "./types";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText
} from "@mui/material";

function UnattendConfirmationDialog(props: UnattendConfirmationDialogProps) {
    const { isOpen, eventTitle, onClose, onConfirm } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="unattend-confirmation-dialog-title"
            aria-describedby="unattend-confirmation-dialog-description"
        >
            <DialogTitle id="unattend-confirmation-dialog-title">
                Confirm Cancellation
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="unattend-confirmation-dialog-description">
                    You're about to cancel your attendance to <strong>{eventTitle}</strong>. Since this is a paid event, your
                    payment will not be automatically refunded. Are you sure you want to proceed?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Keep My Reservation
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Cancel Attendance
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UnattendConfirmationDialog;