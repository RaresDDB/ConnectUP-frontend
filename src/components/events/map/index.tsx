import { useEffect } from "react";
import { EventsMapProps } from "./types";
import { InfoWindowMarker } from "../../info-window-marker";
import {
    Map,
    useMap
} from "@vis.gl/react-google-maps";

function EventsMap(props: EventsMapProps) {
    const { events, mapCenter } = props;

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

export default EventsMap;