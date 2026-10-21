import {
    useState,
    useEffect
} from 'react';
import {
    MdAccessTime,
    MdDirectionsCar
} from 'react-icons/md';
import {
    DirectionsContentProps,
    EventDirectionsDialogProps
} from './types';
import {
    Map,
    useMap,
    useMapsLibrary
} from '@vis.gl/react-google-maps';
import {
    Button,
    Typography,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import {
    RouteInfo,
    RoutesList,
    EventDialog,
    MapContainer,
    RouteSummary,
    RouteInfoItem,
    ModalContainer,
    DirectionsInfo,
    StepsContainer,
    RoutesListITem,
    StepInstruction,
    AlternativeRoutes
} from './styles';

const DirectionsContent = (props: DirectionsContentProps) => {
    const { origin, destination } = props;

    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');

    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
        if (!map || !routesLibrary) return;

        setDirectionsService(new routesLibrary.DirectionsService());

        setDirectionsRenderer(
            new routesLibrary.DirectionsRenderer({
                map,
                draggable: true
            })
        );
    }, [map, routesLibrary]);

    useEffect(() => {
        if (!directionsRenderer) return;

        const listener = directionsRenderer.addListener(
            'directions_changed',
            () => {
                const result = directionsRenderer.getDirections();
                result && setRoutes(result.routes);
            }
        );

        return () => google.maps.event.removeListener(listener);
    }, [directionsRenderer]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService
            .route({
                origin,
                destination,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            });

        return () => directionsRenderer.setMap(null);
    }, [origin, destination, directionsService, directionsRenderer]);

    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;

    return (
        <DirectionsInfo>
            <RouteSummary>
                <Typography variant="h6">{selected.summary}</Typography>
                <Typography>
                    From: {leg.start_address.split(',')[0]}
                </Typography>
                <Typography>
                    To: {leg.end_address.split(',')[0]}
                </Typography>
            </RouteSummary>

            <RouteInfo>
                <RouteInfoItem>
                    <MdAccessTime />
                    <Typography>{leg.duration?.text}</Typography>
                </RouteInfoItem>
                <RouteInfoItem>
                    <MdDirectionsCar />
                    <Typography>{leg.distance?.text}</Typography>
                </RouteInfoItem>
            </RouteInfo>

            <AlternativeRoutes>
                <Typography variant="h6">Alternative Routes</Typography>
                <RoutesList>
                    {routes.map((route, index) => (
                        <RoutesListITem key={route.summary}>
                            <Button
                                fullWidth
                                onClick={() => setRouteIndex(index)}
                                variant={index === routeIndex ? "contained" : "outlined"}
                            >
                                {route.summary}
                            </Button>
                        </RoutesListITem>
                    ))}
                </RoutesList>
            </AlternativeRoutes>

            <StepsContainer>
                {leg.steps.map((step, index) => (
                    <StepInstruction
                        key={index}
                        dangerouslySetInnerHTML={{ __html: step.instructions }}
                    />
                ))}
            </StepsContainer>
        </DirectionsInfo>
    );
};

const EventDirectionsDialog = (props: EventDirectionsDialogProps) => {
    const { open, title, onClose, origin, destination } = props;

    return (
        <EventDialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Directions to {title} event</DialogTitle>
            <DialogContent>
                <ModalContainer>
                    <MapContainer>
                        <Map
                            defaultCenter={origin}
                            defaultZoom={12}
                            gestureHandling={'greedy'}
                            fullscreenControl={true}
                        >
                            <DirectionsContent
                                origin={origin}
                                destination={destination}
                            />
                        </Map>
                    </MapContainer>
                </ModalContainer>
            </DialogContent>
        </EventDialog>
    );
};

export default EventDirectionsDialog;