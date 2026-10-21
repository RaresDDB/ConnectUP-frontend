export interface InfoWindowMarkerProps {
    title: string;
    endDate: Date | null;
    imageUri: string;
    position: google.maps.LatLngLiteral;
    startDate: Date;
    description: string;
}

export interface MarkerImageProps {
    size: number;
}