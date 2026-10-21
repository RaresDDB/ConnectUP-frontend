import EventCard from "../../../components/event-card";
import NearbyEventsMap from "../../../components/nearby-events/map";
import { Severity } from "../../../enums/severity-enums";
import { showToastr } from "../../../features/toastr/slice";
import { Position } from "../../../types/position-types";
import { TbSquareHalf } from "react-icons/tb";
import { useAppDispatch } from "../../../store";
import { useGetNearbyEvents } from "../../../features/events/hooks";
import {
    FaMap,
    FaList
} from "react-icons/fa6";
import {
    useState,
    useEffect
} from "react";
import {
    IconButton,
    CircularProgress
} from "@mui/material";
import {
    Title,
    MapWrapper,
    LoadingText,
    TopContainer,
    ViewControls,
    EmptyMessage,
    MainContainer,
    CardsContainer,
    InnerContainer,
    MiddleContainer,
    LoadingContainer
} from "./styles";

function NearbyEvents() {
    console.log("RENDER NEARBY EVENTS");

    const dispatch = useAppDispatch();

    const [mapCenter, setMapCenter] = useState<Position>({
        lat: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LAT),
        lng: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LNG)
    });

    const [circleCenter, setCircleCenter] = useState<Position>({
        lat: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LAT),
        lng: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LNG)
    });

    const [radius, setRadius] = useState<number>(3000);
    const [showMap, setShowMap] = useState<boolean>(true);
    const [showEvents, setShowEvents] = useState<boolean>(true);
    const [positionReady, setPositionReady] = useState<boolean>(false);

    const { events } = useGetNearbyEvents(radius, circleCenter);

    const handleClickBoth = () => {
        setShowMap(true);
        setShowEvents(true);
    }

    const handleClickList = () => {
        setShowMap(false);
        setShowEvents(true);
    }

    const handleClickMap = () => {
        setShowMap(true);
        setShowEvents(false);
    }

    const getCurrentPosition = () => {
        if (!navigator.geolocation) {
            dispatch(
                showToastr({
                    message: 'Geolocation is not supported by your browser',
                    severity: Severity.Error
                })
            );
            setPositionReady(true);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setMapCenter(newPosition);
                setCircleCenter(newPosition);
                setPositionReady(true);
            },
            (error) => {
                dispatch(
                    showToastr({
                        message: error.message,
                        severity: Severity.Error
                    })
                );
                setPositionReady(true);
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
    }, []);

    return (
        <MainContainer>
            <InnerContainer>
                <TopContainer>
                    <Title>Nearby events</Title>
                    <ViewControls>
                        <IconButton
                            color={(showMap && showEvents) ? 'primary' : undefined}
                            onClick={handleClickBoth}
                        >
                            <TbSquareHalf />
                        </IconButton>
                        <IconButton
                            color={(!showMap && showEvents) ? 'primary' : undefined}
                            onClick={handleClickList}
                        >
                            <FaList />
                        </IconButton>
                        <IconButton
                            color={(showMap && !showEvents) ? 'primary' : undefined}
                            onClick={handleClickMap}
                        >
                            <FaMap />
                        </IconButton>
                    </ViewControls>
                </TopContainer>
                <MiddleContainer>
                    {showEvents && (
                        !positionReady ? (
                            <LoadingContainer>
                                <CircularProgress />
                                <LoadingText>Getting your location...</LoadingText>
                            </LoadingContainer>
                        ) : (
                            <CardsContainer>
                                {events.length === 0 ? (
                                    <EmptyMessage>No events found nearby. Try increasing the search radius.</EmptyMessage>
                                ) : (
                                    events.map((event, index) => (
                                        <EventCard key={index} event={event} />
                                    ))
                                )}
                            </CardsContainer>
                        )
                    )}
                    {
                        showMap && (
                            <MapWrapper>
                                <NearbyEventsMap
                                    events={events}
                                    radius={radius}
                                    setRadius={setRadius}
                                    mapCenter={mapCenter}
                                    circleCenter={circleCenter}
                                    setCircleCenter={setCircleCenter}
                                />
                            </MapWrapper>
                        )
                    }
                </MiddleContainer>
            </InnerContainer>
        </MainContainer>
    )
}

export default NearbyEvents;