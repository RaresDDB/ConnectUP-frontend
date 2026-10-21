import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

export const MainContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    maxWidth: "1200px",
    width: "100%",
    gap: "16px"
});

export const Form = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "16px"
});

export const InputField = styled(TextField)({
    width: "100%",
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#fff"
    }
});

export const TextInputWrapper = styled("div")({
    width: '100%',
    position: 'relative'
});

export const AddButton = styled(Button)({
    alignSelf: "flex-end"
});

export const QuestionsContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "16px"
});

// New styles for mentions feature
export const MentionsDropdown = styled("div")({
    position: "absolute",
    top: "100%", // Position right below the input
    left: "0",
    zIndex: 1,
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    borderRadius: "4px",
    maxHeight: "150px",
    overflowY: "auto",
    width: "100%",
    border: "1px solid #ddd",
    marginTop: "4px" // Small gap between input and dropdown
});

export const MentionItem = styled("div")({
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
        backgroundColor: "#f5f5f5"
    },
    userSelect: "none", // Prevent text selection on click
    display: "block",  // Ensure it's a block element
    width: "100%"     // Full width to maximize click area
});

export const MentionHighlight = styled("span")({
    color: "#1976d2",
    fontWeight: "500"
});

export const NoQuestionsText = styled("p")({
});