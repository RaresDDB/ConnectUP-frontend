import EventTags from "../tags";
import EventGallery from "../gallery";
import EventAttendees from "../attendees";
import { ROUTES } from "../../../constants/route-constants";
import { EventDetailsProps } from "./types";
import {
    EventImage,
    Description,
    DetailsContainer,
    EventImageWrapper
} from "./styles";

function EventDetails(props: EventDetailsProps) {
    const { title, imageUri, description, tags, attendees, gallery, host } = props;

    return (
        <DetailsContainer>
            <EventImageWrapper>
                <EventImage src={ROUTES.STATIC_IMAGES.create(imageUri)} alt={title} />
            </EventImageWrapper>
            <Description>{description}</Description>
            <EventTags tags={tags} />
            <EventAttendees attendees={attendees} host={host} />
            <EventGallery gallery={gallery} />
        </DetailsContainer>
    )
};

export default EventDetails;