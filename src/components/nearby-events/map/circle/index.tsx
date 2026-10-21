import { CircleProps } from './types';
import { GoogleMapsContext } from '@vis.gl/react-google-maps';
import {
    useRef,
    useEffect,
    useContext
} from 'react';

export const Circle = (props: CircleProps) => {
    const { center, radius, setRadius, setCenter } = props;

    const map = useContext(GoogleMapsContext)?.map;
    const circleRef = useRef<google.maps.Circle | null>(null);

    useEffect(() => {
        if (!map) return;

        if (!circleRef.current) {
            circleRef.current = new google.maps.Circle({
                strokeColor: '#0c4cb3',
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: '#3b82f6',
                fillOpacity: 0.2,
                map: map,
                editable: true,
                draggable: true
            });

            google.maps.event.addListener(circleRef.current, 'radius_changed', () => {
                if (circleRef.current && setRadius) {
                    setRadius(Math.round(circleRef.current.getRadius()));
                }
            });

            google.maps.event.addListener(circleRef.current, 'center_changed', () => {
                if (circleRef.current && setCenter) {
                    const newCenter = circleRef.current.getCenter();
                    if (newCenter) {
                        setCenter({
                            lat: newCenter.lat(),
                            lng: newCenter.lng()
                        });
                    }
                }
            });
        }

        circleRef.current.setOptions({
            center: center,
            radius: radius
        });

        return () => {
            if (circleRef.current) {
                google.maps.event.clearInstanceListeners(circleRef.current);
                circleRef.current.setMap(null);
                circleRef.current = null;
            }
        };
    }, [map, center.lat, center.lng, radius, setRadius, setCenter]);

    return null;
};