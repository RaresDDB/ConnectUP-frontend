import { Circle } from "./circle";
import { useEffect } from "react";
import { InfoWindowMarker } from "../../info-window-marker";
import { NearbyEventsMapProps } from "./types";
import {
    Map,
    useMap
} from "@vis.gl/react-google-maps";

function NearbyEventsMap(props: NearbyEventsMapProps) {
    const {
        events,
        radius,
        setRadius,
        mapCenter,
        circleCenter,
        setCircleCenter
    } = props;

    const map = useMap();

    useEffect(() => {
        map && map.setCenter(mapCenter);
    }, [mapCenter])

    return (
        <Map
            mapId={'bf51a910020fa25c'}
            defaultCenter={mapCenter}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        >
            <Circle
                radius={radius}
                center={circleCenter}
                setRadius={setRadius}
                setCenter={setCircleCenter}
            />
            {
                events.map(({ lat, lng, title, endDate, imageUri, startDate, description }, index) => (
                    <InfoWindowMarker
                        key={index}
                        title={title}
                        endDate={endDate}
                        imageUri={imageUri}
                        startDate={startDate}
                        description={description}
                        position={{ lat, lng }}
                    />
                ))
            }
        </Map>
    )
}

export default NearbyEventsMap;