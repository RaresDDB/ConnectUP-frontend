import DateUtils from '../../utils/date-utils';
import { ROUTES } from '../../constants/route-constants';
import { InfoWindowMarkerProps } from './types';
import {
    Fragment,
    useState
} from 'react';
import {
    InfoWindow,
    AdvancedMarker,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import {
    Text,
    Title,
    Container,
    EventImage,
    MarkerImage
} from './styles';

export const InfoWindowMarker = (props: InfoWindowMarkerProps) => {
    const { title, position, imageUri, description, startDate, endDate } = props;

    const [infoWindowOpen, setInfoWindowOpen] = useState(false);

    const [markerRef, marker] = useAdvancedMarkerRef();

    const openInfoWindow = () => {
        setInfoWindowOpen(true)
    }

    const closeInfoWindow = () => {
        setInfoWindowOpen(false);
    }

    return (
        <Fragment>
            <AdvancedMarker
                ref={markerRef}
                title={title}
                onClick={openInfoWindow}
                position={position}
            >
                <MarkerImage src={ROUTES.STATIC_IMAGES.create(imageUri)} size={48} />
            </AdvancedMarker>
            {infoWindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={300}
                    onCloseClick={closeInfoWindow}
                >
                    <Container>
                        <EventImage src={ROUTES.STATIC_IMAGES.create(imageUri)} />
                        <Title>{title}</Title>
                        <Text>{description}</Text>
                        <Text>
                            {DateUtils.formatDate(startDate)} - {endDate ? DateUtils.formatDate(endDate) : 'Ongoing'}
                        </Text>
                    </Container>
                </InfoWindow>
            )}
        </Fragment>
    );
};