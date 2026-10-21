import EventCard from "../../../components/event-card";
import EventsMap from "../../../components/events/map";
import { Position } from "../../../types/position-types";
import { Severity } from "../../../enums/severity-enums";
import { SortOption } from "../../../enums/sort-enums";
import { showToastr } from "../../../features/toastr/slice";
import { MdCategory } from "react-icons/md";
import { TbSquareHalf } from "react-icons/tb";
import { useGetAllMemberEvents } from "../../../features/events/hooks";
import {
    useAppDispatch,
    useAppSelector
} from "../../../store";
import {
    useMemo,
    useState,
    useEffect,
    ChangeEvent
} from "react";
import {
    FaMap,
    FaList,
    FaHeart,
    FaUserCheck,
    FaMoneyBill1Wave
} from "react-icons/fa6";
import {
    Select,
    MenuItem,
    IconButton,
    InputLabel,
    SelectChangeEvent,
    CircularProgress
} from "@mui/material";
import {
    Title,
    MapWrapper,
    SearchInput,
    LoadingText,
    TopContainer,
    ViewControls,
    EmptyMessage,
    MainContainer,
    OrdersControls,
    CardsContainer,
    InnerContainer,
    SortFormControl,
    MiddleContainer,
    FiltersControls,
    ControlsDivider,
    ActionsContainer,
    LoadingContainer,
    SearchInputWrapper
} from "./styles";

function Events() {
    console.log('RENDER EVENTS');

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth.user);

    const { events } = useGetAllMemberEvents();

    const [mapCenter, setMapCenter] = useState<Position>({
        lat: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LAT),
        lng: Number(import.meta.env.VITE_GOOGLE_MAP_DEFAULT_LNG)
    });

    const [showMap, setShowMap] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showEvents, setShowEvents] = useState<boolean>(true);
    const [sortOption, setSortOption] = useState<SortOption>(SortOption.DateAsc);
    const [showPayable, setShowPayable] = useState<boolean>(false);
    const [showAttended, setShowAttended] = useState<boolean>(false);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const [positionReady, setPositionReady] = useState<boolean>(false);
    const [showRecommended, setShowRecommended] = useState<boolean>(false);

    const handleClickAttented = () => {
        setShowAttended((current) => !current);
    }

    const handleClickFavorites = () => {
        setShowFavorites((current) => !current);
    }

    const handleClickPayable = () => {
        setShowPayable((current) => !current);
    }

    const handleClickRecommended = () => {
        setShowRecommended((current) => !current);
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

    const handleChangeSearchEvent = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const handleChangeSortOption = (e: SelectChangeEvent) => {
        setSortOption(e.target.value as SortOption);
    };

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
                setMapCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
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

    const filteredEvents = useMemo(() => {
        return events.filter(({ tags, title, attended, favorite, paidEvent }) => {
            const tagsNames = tags.map((tag) => tag.name);

            if (showPayable && !paidEvent) {
                return false;
            }
            if (showAttended && !attended) {
                return false;
            }
            if (showFavorites && !favorite) {
                return false;
            }
            if (showRecommended && !user?.tags.some(({ name }) => tagsNames.includes(name))) {
                return false;
            }
            if (!title.includes(searchTerm)) {
                return false;
            }

            return true;
        });
    }, [events, searchTerm, showAttended, showFavorites, showPayable, showRecommended]);

    const sortedEvents = useMemo(() => {
        return [...filteredEvents].sort((a, b) => {
            const dateA = new Date(a.startDate).getTime();
            const dateB = new Date(b.startDate).getTime();
            const attendeesA = a.attendees.length;
            const attendeesB = b.attendees.length;

            switch (sortOption) {
                case SortOption.DateAsc:
                    return dateA - dateB;
                case SortOption.DateDesc:
                    return dateB - dateA;
                case SortOption.AttendeesAsc:
                    return attendeesA - attendeesB;
                case SortOption.AttendeesDesc:
                    return attendeesB - attendeesA;
                default:
                    return dateA - dateB;
            }
        });
    }, [filteredEvents, sortOption]);

    useEffect(() => {
        getCurrentPosition();
    }, []);

    return (
        <MainContainer>
            <InnerContainer>
                <TopContainer>
                    <Title>Events</Title>
                    <ActionsContainer>
                        <SearchInputWrapper>
                            <SearchInput
                                size="small"
                                label="Event"
                                onChange={handleChangeSearchEvent}
                                placeholder="Search an event..."
                            />
                        </SearchInputWrapper>
                        <ControlsDivider role="separator" orientation="vertical" />
                        <OrdersControls>
                            <SortFormControl size='small' fullWidth>
                                <InputLabel id="sort-option-select-label">Sort By</InputLabel>
                                <Select
                                    labelId="sort-option-select-label"
                                    id="sort-option-select"
                                    value={sortOption}
                                    label="Sort By"
                                    onChange={handleChangeSortOption}
                                >
                                    <MenuItem value={SortOption.DateAsc}>Date (Newest First)</MenuItem>
                                    <MenuItem value={SortOption.DateDesc}>Date (Oldest First)</MenuItem>
                                    <MenuItem value={SortOption.AttendeesAsc}>Attendees (Fewest First)</MenuItem>
                                    <MenuItem value={SortOption.AttendeesDesc}>Attendees (Most First)</MenuItem>
                                </Select>
                            </SortFormControl>
                        </OrdersControls>
                        <ControlsDivider role="separator" orientation="vertical" />
                        <FiltersControls>
                            <IconButton
                                color={showAttended ? 'primary' : undefined}
                                onClick={handleClickAttented}
                            >
                                <FaUserCheck />
                            </IconButton>
                            <IconButton
                                color={showFavorites ? 'primary' : undefined}
                                onClick={handleClickFavorites}
                            >
                                <FaHeart />
                            </IconButton>
                            <IconButton
                                color={showPayable ? 'primary' : undefined}
                                onClick={handleClickPayable}
                            >
                                <FaMoneyBill1Wave />
                            </IconButton>
                            <IconButton
                                color={showRecommended ? 'primary' : undefined}
                                onClick={handleClickRecommended}
                            >
                                <MdCategory />
                            </IconButton>
                        </FiltersControls>
                        <ControlsDivider role="separator" orientation="vertical" />
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
                    </ActionsContainer>
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
                                {sortedEvents.length === 0 ? (
                                    <EmptyMessage>No events found, try other filters.</EmptyMessage>
                                ) : (
                                    sortedEvents.map((event, index) => (
                                        <EventCard key={index} event={event} />
                                    ))
                                )}
                            </CardsContainer>
                        )
                    )}
                    {
                        showMap && (
                            <MapWrapper>
                                <EventsMap
                                    events={sortedEvents}
                                    mapCenter={mapCenter}
                                />
                            </MapWrapper>
                        )
                    }
                </MiddleContainer>
            </InnerContainer>
        </MainContainer >
    )
}

export default Events;