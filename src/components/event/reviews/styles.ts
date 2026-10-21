import { styled } from "@mui/material/styles";
import {
    Button,
    TextField
} from "@mui/material";

export const MainContainer = styled("div")(({ theme }) => ({
    width: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    "& > div:not(:first-of-type)": {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    }
}));

export const Form = styled("form")({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
});

export const InputField = styled(TextField)({
    width: '100%',
    backgroundColor: '#fff'
});

export const AddButton = styled(Button)({
    textTransform: "none",
    padding: "6px 0",
    borderRadius: "0",
    fontSize: "12px",
    width: "110px"
});

export const ReviewsContainer = styled("div")({
    display: 'flex',
    flexDirection: 'column'
});