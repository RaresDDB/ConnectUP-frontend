import { Map } from "@vis.gl/react-google-maps";
import { EventMapProps } from "./types";
import { InfoWindowMarker } from "../../info-window-marker";

function EventMap(props: EventMapProps) {
    const { lat, lng, title, endDate, imageUri, startDate, description } = props;

    const position = { lat, lng };

    return (
        <Map
            mapId={'bf51a910020fa25c'}
            // style={{ width: '100%', height: '100%' }}
            defaultCenter={position}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        >
            <InfoWindowMarker
                title={title}
                endDate={endDate}
                imageUri={imageUri}
                position={position}
                startDate={startDate}
                description={description}
            />
        </Map>
    )
}

export default EventMap;