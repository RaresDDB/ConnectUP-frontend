import { useEffect } from 'react';
import { InfoWindowMarker } from '../../info-window-marker';
import { ManageEventsMapProps } from './types';
import {
    Map,
    useMap
} from '@vis.gl/react-google-maps';

function ManageEventsMap(props: ManageEventsMapProps) {
    const { events, mapCenter } = props;

    const map = useMap();

    useEffect(() => {
        map && map.setCenter(mapCenter);
    }, [mapCenter])

    return (
        <Map
            mapId={'bf51a910020fa25c'}
            style={{ width: '100%', height: '100%' }}
            defaultCenter={mapCenter}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={false}
        >
            {
                events.map(({ title, imageUri, description, startDate, endDate, lat, lng }, index) => (
                    <InfoWindowMarker
                        key={index}
                        title={title}
                        endDate={endDate}
                        imageUri={imageUri}
                        startDate={startDate}
                        description={description}
                        position={{
                            lat,
                            lng
                        }}
                    />
                ))
            }
        </Map>
    )
}

export default ManageEventsMap;