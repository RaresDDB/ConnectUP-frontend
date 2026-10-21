import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { CircularProgressProps } from "./types";

export const StyledCircularProgress = styled(CircularProgress, {
    shouldForwardProp: (prop) => prop !== 'customColor',
})<CircularProgressProps>(({ theme, customColor }) => ({
    color: customColor ?? theme.palette.primary.main
}));