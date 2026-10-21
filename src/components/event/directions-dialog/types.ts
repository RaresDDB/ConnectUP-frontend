export interface DirectionsContentProps {
    origin: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
}

export interface EventDirectionsDialogProps {
    open: boolean;
    title: string;
    onClose: () => void;
    origin: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
}