import { hideToastr } from '../../features/toastr/slice';
import {
    Alert,
    Snackbar
} from '@mui/material';
import {
    useEffect,
    useState
} from 'react';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';

const Toastr = () => {
    const dispatch = useAppDispatch();
    const [key, setKey] = useState(0);
    const { open, message, severity } = useAppSelector(state => state.toastr);

    useEffect(() => {
        if (message) {
            setKey(prev => prev + 1);
        }
    }, [message]);

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(hideToastr());
    };

    if (!open || !message || !severity) {
        return null;
    }

    return (
        <Snackbar
            key={key}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={5000}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toastr;