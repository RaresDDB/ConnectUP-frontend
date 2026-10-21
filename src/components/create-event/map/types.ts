export interface CreateEventMapProps {
    markers: google.maps.LatLngLiteral[];
    setMarkers: (markers: google.maps.LatLngLiteral[]) => void;
}