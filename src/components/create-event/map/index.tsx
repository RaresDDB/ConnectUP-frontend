import { Severity } from '../../../enums/severity-enums';
import { useEffect } from 'react';
import { showToastr } from '../../../features/toastr/slice';
import { useAppDispatch } from '../../../store';
import { CreateEventMapProps } from './types';
import {
    Map,
    useMap,
    MapMouseEvent,
    AdvancedMarker
} from '@vis.gl/react-google-maps';

const CreateEventMap = (props: CreateEventMapProps) => {
    const dispatch = useAppDispatch();

    const map = useMap();

    const { markers, setMarkers } = props;

    const handleClick = (e: MapMouseEvent) => {
        e.detail.latLng && setMarkers([...markers, e.detail.latLng]);
    };

    const handleMarkerClick = (index: number) => {
        setMarkers(markers.filter((_, markerIndex) => index !== markerIndex));
    };

    const getCurrentPosition = () => {
        if (!navigator.geolocation) {
            dispatch(
                showToastr({
                    message: 'Geolocation is not supported by your browser',
                    severity: Severity.Error
                })
            );
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                map && map.setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                dispatch(
                    showToastr({
                        message: error.message,
                        severity: Severity.Error
                    })
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    useEffect(() => {
        getCurrentPosition();
    }, [map]);

    const mapCenter = {
        lat: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LAT),
        lng: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LNG)
    };

    return (
        <Map
            mapId={'bf51a910020fa25a'}
            style={{ width: '100%', height: '100%' }}
            defaultCenter={mapCenter}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={false}
            onClick={handleClick}
        >
            {markers.map((position, index) => (
                <AdvancedMarker
                    key={index}
                    position={position}
                    title={`Marker ${index + 1}`}
                    onClick={() => handleMarkerClick(index)}
                />
            ))}
        </Map>
    )
}

export default CreateEventMap;