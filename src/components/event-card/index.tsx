import DateUtils from "../../utils/date-utils";
import PaymentModal from "./payment-modal";
import UnattendConfirmationDialog from "./unattend-confirmation-dialog";
import { Role } from "../../enums/role-enums";
import { ROUTES } from "../../constants/route-constants";
import { Tooltip } from "@mui/material";
import { isMemberEvent } from "../../types/event-types";
import { EventCardProps } from "./types";
import {
    FaHeart,
    FaUsers
} from "react-icons/fa6";
import {
    useState,
    MouseEvent
} from "react";
import {
    useAppDispatch,
    useAppSelector
} from "../../store";
import {
    useAttendEvent,
    useUnattendEvent,
    useAddEventToFavorites,
    useRemoveEventFromFavorites
} from "../../features/events/hooks";
import {
    attendEvent,
    unattendEvent,
    deleteEventById,
    addEventToFavorites,
    removeEventFromFavorites
} from "../../features/events/thunks";
import {
    Title,
    Image,
    Price,
    DateText,
    CardLink,
    Attendees,
    Description,
    ImageWrapper,
    AttendButton,
    DeleteButton,
    TopContainer,
    MaxAttendees,
    InnerContainer,
    BottomContainer,
    MiddleContainer,
    FavoriteWrapper,
    DetailsContainer,
    FavoriteIconButton
} from "./styles";

function EventCard(props: EventCardProps) {
    const { event } = props;

    const { id, title, paidEvent, startDate, imageUri, attendees, description } = event;

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showUnattendDialog, setShowUnattendDialog] = useState(false);

    const user = useAppSelector(state => state.auth.user);

    useAttendEvent();
    useUnattendEvent();
    useAddEventToFavorites();
    useRemoveEventFromFavorites();

    const dispatch = useAppDispatch();

    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (user && user.role.name === Role.Admin) {
            dispatch(deleteEventById({ id }))
        }
    }

    const handleAttend = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (user && user.role.name === Role.Member) {
            if (paidEvent) {
                setShowPaymentModal(true);
            } else {
                dispatch(attendEvent({ id }))
            }
        }
    }

    const handleConfirmUnattend = () => {
        setShowUnattendDialog(false);
        dispatch(unattendEvent({ id }));
    }

    const handleCloseUnattendModal = () => {
        setShowUnattendDialog(false);
    }

    const handleUnattend = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (user && user.role.name === Role.Member) {
            if (event.paidEvent) {
                setShowUnattendDialog(true);
            } else {
                dispatch(unattendEvent({ id }));
            }
        }
    }

    const handleCardClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (showPaymentModal || showUnattendDialog) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const handlePaymentSuccess = () => {
        setShowPaymentModal(false);
        dispatch(attendEvent({ id }));
    }

    const renderFavoriteButton = () => {
        if (!user || user.role.name !== Role.Member || !isMemberEvent(event)) {
            return null;
        }

        return (
            <FavoriteIconButton
                size="small"
                color={event.favorite ? 'primary' : 'default'}
                onClick={event.favorite ? handleRemoveFromFavorites : handleAddToFavorites}
            >
                <FaHeart />
            </FavoriteIconButton>
        );
    }

    const handleAddToFavorites = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (user && user.role.name === Role.Member) {
            dispatch(addEventToFavorites({ id }));
        }
    }

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false);
    }

    const handleRemoveFromFavorites = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (user && user.role.name === Role.Member) {
            dispatch(removeEventFromFavorites({ id }));
        }
    }

    const renderPrice = () => {
        if (!event.paidEvent) return null;

        return (
            <Price>
                {event.paidEvent.price} {event.paidEvent.currency}
            </Price>
        );
    }

    const renderMaxAttendees = () => {
        if (!event.paidEvent) return null;

        return (
            <Tooltip title={`A number of ${event.paidEvent.maxAttendees} attendees are allowed to this event`}>
                <MaxAttendees>
                    {`< ${event.paidEvent.maxAttendees}`} <FaUsers />
                </MaxAttendees>
            </Tooltip>
        );
    }

    const renderDynamicButton = () => {
        if (!user) return null;

        switch (user.role.name) {
            case Role.Admin:
                return (
                    <DeleteButton
                        size="small"
                        variant="contained"
                        onClick={handleDelete}
                    >
                        Delete
                    </DeleteButton>
                );

            case Role.Member:
                if (!isMemberEvent(event)) return null;

                return (
                    <AttendButton
                        size="small"
                        variant="contained"
                        onClick={event.attended ? handleUnattend : handleAttend}
                    >
                        {event.attended ? 'Unattend' : 'Attend'}
                    </AttendButton>
                );

            default:
                return null;
        }
    }

    return (
        <CardLink
            to={ROUTES.EVENT.create(id)}
            onClick={handleCardClick}
        >
            <ImageWrapper>
                <Image src={ROUTES.STATIC_IMAGES.create(imageUri)} alt={title} />
            </ImageWrapper>
            <DetailsContainer>
                <TopContainer>
                    <DateText>
                        {DateUtils.formatDate(startDate)}
                    </DateText>
                    <FavoriteWrapper>
                        {renderFavoriteButton()}
                    </FavoriteWrapper>
                </TopContainer>
                <MiddleContainer>
                    <InnerContainer>
                        <Title>
                            {title}
                        </Title>
                        {renderPrice()}
                    </InnerContainer>
                    <InnerContainer>
                        <Description>
                            {description}
                        </Description>
                        {renderMaxAttendees()}
                    </InnerContainer>
                </MiddleContainer>
                <BottomContainer>
                    <Attendees>
                        {attendees.length} attendees
                    </Attendees>
                    {renderDynamicButton()}
                </BottomContainer>
            </DetailsContainer>
            {paidEvent && (
                <>
                    <PaymentModal
                        isOpen={showPaymentModal}
                        price={paidEvent.price}
                        eventId={id}
                        onClose={handleClosePaymentModal}
                        currency={paidEvent.currency}
                        onSuccess={handlePaymentSuccess}
                    />
                    <UnattendConfirmationDialog
                        isOpen={showUnattendDialog}
                        eventTitle={title}
                        onClose={handleCloseUnattendModal}
                        onConfirm={handleConfirmUnattend}
                    />
                </>
            )}
        </CardLink>
    )
}

export default EventCard;