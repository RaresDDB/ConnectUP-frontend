import { styled } from "@mui/material/styles";
import {
    List,
    Dialog,
    ListItem
} from "@mui/material";

export const EventDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        maxWidth: '1200px',
        width: '100%',
        '& .MuiDialogContent-root': {
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.palette.primary.light} transparent`,
        }
    }
}));

export const ModalContainer = styled('div')({
    height: '80vh',
    width: '100%'
});

export const MapContainer = styled('div')({
    height: '50vh',
    width: '100%'
});

export const DirectionsInfo = styled('div')({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px 0"
});

export const RouteInfo = styled('div')({
    display: 'flex',
    gap: '16px'
});

export const RouteInfoItem = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
});

export const RoutesList = styled(List)({
    padding: "0",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
});

export const RoutesListITem = styled(ListItem)({
    padding: "0"
});

export const StepsContainer = styled('div')(({ theme }) => ({
    maxHeight: 200,
    overflow: 'auto',
    scrollBehavior: 'smooth',
    marginRight: '-8px',
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.primary.light} transparent`,
}));

export const StepInstruction = styled('div')({
    padding: '12px 8px',
    borderBottom: '1px solid #eee',
    '&:last-child': {
        borderBottom: 'none'
    },
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
});

export const RouteSummary = styled('div')({
    display: "flex",
    flexDirection: "column",
    gap: "8px"
});

export const AlternativeRoutes = styled('div')({
    display: "flex",
    flexDirection: "column",
    gap: "8px"
});

export const TravelModeSelector = styled('div')({
    display: "flex",
    alignItems: "center",
    gap: "16px"
});