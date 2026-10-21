import { CircularSpinnerProps } from "./types";
import { StyledCircularProgress } from "./styles";

function CircularSpinner(props: CircularSpinnerProps) {
    const { size, color } = props;

    return (
        <StyledCircularProgress size={size} customColor={color} />
    )
}

export default CircularSpinner;