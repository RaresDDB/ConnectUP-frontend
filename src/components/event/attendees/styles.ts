import { styled } from "@mui/material";

export const AttendeesContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
});

export const AttendeesTitle = styled('h3')({
});

export const CardsContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(125px, 1fr))',
    gap: '16px',
    backgroundColor: "#fff",
    padding: "16px"
});

export const AttendeeCard = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "8px",
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: "16px",
    borderRadius: "8px"
}))

export const AttendeeImage = styled('img')({
});

export const AttendeeName = styled('span')({
    fontSize: "14px",
    textAlign: "center",
    fontWeight: "700",
});

export const AttendMore = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "14px",
    fontWeight: "700"
}))

export const AttendeeRole = styled('span')({
    fontSize: "12px",
    color: "#707070"
});