import { Severity } from "../../../../enums/severity-enums";
import { showToastr } from "../../../../features/toastr/slice";
import { createPayment } from "../../../../features/payments/thunks";
import { useAppDispatch } from "../../../../store";
import { useCreatePayment } from "../../../../features/payments/hooks";
import { PaymentFormProps } from "./types";
import {
    useStripe,
    CardElement,
    useElements
} from "@stripe/react-stripe-js";
import {
    Box,
    Button,
    Typography,
    DialogContent,
    DialogActions,
    CircularProgress
} from "@mui/material";

const PaymentForm = (props: PaymentFormProps) => {
    const {
        price,
        onClose,
        currency,
        onSuccess
    } = props;

    const dispatch = useAppDispatch();

    const stripe = useStripe();
    const elements = useElements();

    const { isLoading } = useCreatePayment();

    const handleSubmit = async () => {
        if (!stripe || !elements) {
            dispatch(
                showToastr({
                    message: 'Payment system not initialized',
                    severity: Severity.Error
                })
            );
            return;
        }

        const { clientSecret } = await dispatch(createPayment({
            amount: price * 100,
            currency: currency
        })).unwrap();

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            dispatch(
                showToastr({
                    message: 'Card element not found',
                    severity: Severity.Error
                })
            );
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: cardElement,
                },
            }
        );

        if (error) {
            dispatch(
                showToastr({
                    message: error.message || 'Payment failed',
                    severity: Severity.Error
                })
            );
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            onSuccess();
        }
    };

    return (
        <Box>
            <DialogContent>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Please enter your card details to complete the payment.
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            p: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            backgroundColor: 'background.paper'
                        }}
                    >
                        <CardElement
                            options={{
                                hidePostalCode: true,
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    color="inherit"
                    onClick={onClose}
                    type="button"
                >
                    Cancel
                </Button>
                <Button
                    size="small"
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
                >
                    Pay {price} {currency}
                </Button>
            </DialogActions>
        </Box>
    );
};

export default PaymentForm;