import EventMap from "../map";
import DateUtils from "../../../utils/date-utils";
import EventDirectionsModal from "../directions-dialog";
import { Severity } from "../../../enums/severity-enums";
import { showToastr } from "../../../features/toastr/slice";
import { useAppDispatch } from "../../../store";
import { EventLocationProps } from "./types";
import {
    Fragment,
    useState
} from "react";
import {
    FaClock,
    FaRoute,
    FaLocationDot
} from "react-icons/fa6";
import {
    Date,
    Location,
    MapWrapper,
    TopContainer,
    DateContainer,
    InfoContainer,
    LocationContainer,
    DirectionsIconButton
} from "./styles";

function EventLocation(props: EventLocationProps) {
    const { lat, lng, title, endDate, address, imageUri, startDate, description } = props;

    const dispatch = useAppDispatch();

    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [showDirections, setShowDirections] = useState(false);

    const handleGetDirections = () => {
        if (!navigator.geolocation) {
            dispatch(
                showToastr({
                    message: "Geolocation is not supported by your browser",
                    severity: Severity.Warning
                })
            );
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setShowDirections(true);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        dispatch(
                            showToastr({
                                message: "Please enable location services to get directions",
                                severity: Severity.Warning
                            })
                        );
                        break;
                    case error.POSITION_UNAVAILABLE:
                        dispatch(
                            showToastr({
                                message: "Location information is unavailable",
                                severity: Severity.Warning
                            })
                        );
                        break;
                    case error.TIMEOUT:
                        dispatch(
                            showToastr({
                                message: "Location request timed out",
                                severity: Severity.Warning
                            })
                        );
                        break;
                    default:
                        dispatch(
                            showToastr({
                                message: "An unknown error occurred",
                                severity: Severity.Warning
                            })
                        );
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    return (
        <Fragment>
            <InfoContainer>
                <TopContainer>
                    <DateContainer>
                        <FaClock />
                        <Date>
                            {DateUtils.formatDate(startDate)}
                        </Date>
                    </DateContainer>
                    <DirectionsIconButton
                        onClick={handleGetDirections}
                    >
                        <FaRoute />
                    </DirectionsIconButton>
                </TopContainer>
                <LocationContainer>
                    <FaLocationDot />
                    <Location>{address}</Location>
                </LocationContainer>
                <MapWrapper>
                    <EventMap
                        lat={lat}
                        lng={lng}
                        title={title}
                        endDate={endDate}
                        imageUri={imageUri}
                        startDate={startDate}
                        description={description}
                    />
                </MapWrapper>
            </InfoContainer>
            {(showDirections && userLocation) && (
                <EventDirectionsModal
                    open={showDirections}
                    title={title}
                    origin={userLocation}
                    onClose={() => setShowDirections(false)}
                    destination={{ lat, lng }}
                />
            )}
        </Fragment>
    );
}

export default EventLocation;