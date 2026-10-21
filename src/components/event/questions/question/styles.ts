import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

export const MainContainer = styled("div")({
    display: "flex",
    gap: "20px",
    padding: "16px 0"
});

export const UserContainer = styled("div")({
    flex: "0 0 130px",
    minWidth: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
});

export const Name = styled("span")({
    fontSize: "14px",
    color: "#444"
});

export const Date = styled("span")({
    fontSize: "12px",
    color: "#888"
});

export const QuestionContainer = styled("div")({
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
});

export const Title = styled("h4")({
    fontSize: "16px",
    color: "#444"
});

export const Text = styled("p")({
    fontSize: "14px",
    color: "#444"
});

export const ActionsContainer = styled("div")({
    display: "flex"
});

export const LikeContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: '4px'
});

export const LikeIconButton = styled(IconButton)({
    padding: '0'
});

export const LikeCount = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: '14px'
}))