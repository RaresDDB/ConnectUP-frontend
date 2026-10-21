import EventCard from '../../../components/event-card';
import ManageEventsMap from '../../../components/manage-events/map';
import { ROUTES } from '../../../constants/route-constants';
import { Severity } from '../../../enums/severity-enums';
import { Position } from '../../../types/position-types';
import { showToastr } from '../../../features/toastr/slice';
import { useNavigate } from 'react-router-dom';
import { TbSquareHalf } from 'react-icons/tb';
import { useAppDispatch } from '../../../store';
import {
    useState,
    useEffect
} from 'react';
import {
    IconButton,
    CircularProgress
} from '@mui/material';
import {
    useDeleteEventById,
    useGetAllAdminEvents
} from '../../../features/events/hooks';
import {
    FaMap,
    FaList,
    FaPlus
} from 'react-icons/fa6';
import {
    Title,
    MapWrapper,
    LoadingText,
    TopContainer,
    EmptyMessage,
    ViewControls,
    MainContainer,
    CardsContainer,
    InnerContainer,
    MiddleContainer,
    LoadingContainer
} from './styles';

function ManageEvents() {
    console.log("RENDER MANAGE EVENTS");

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [mapCenter, setMapCenter] = useState<Position>({
        lat: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LAT),
        lng: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LNG)
    });

    const [showMap, setShowMap] = useState(true);
    const [showEvents, setShowEvents] = useState(true);
    const [positionReady, setPositionReady] = useState<boolean>(false);

    const { events } = useGetAllAdminEvents();

    useDeleteEventById();

    const handleClickCreateEvent = () => {
        navigate(ROUTES.CREATE_EVENT.path);
    }

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
                    <Title>Manage events</Title>
                    <ViewControls>
                        <IconButton onClick={handleClickCreateEvent}>
                            <FaPlus />
                        </IconButton>
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
                                    <EmptyMessage>No events found.</EmptyMessage>
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
                                <ManageEventsMap
                                    events={events}
                                    mapCenter={mapCenter}
                                />
                            </MapWrapper>
                        )
                    }
                </MiddleContainer>
            </InnerContainer>
        </MainContainer>
    )
}

export default ManageEvents;