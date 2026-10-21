import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TabButtonProps } from "./types";

export const Main = styled("main")(({ theme }) => ({
    height: "calc(100vh - 64px - 64px)",
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

export const MainContainer = styled("div")({
    display: "flex",
    flexDirection: "column"
});

export const TabsContainer = styled("div")({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    backgroundColor: "#fff"
});

export const TabButton = styled(
    Button,
    { shouldForwardProp: (prop) => prop !== "active" }
)<TabButtonProps>(({ theme, active }) => ({
    color: active ? "#000" : theme.palette.text.primary,
    backgroundColor: active ? theme.palette.grey[300] : "#fff",
    padding: "8px 4px",
    fontSize: "12px"
}));