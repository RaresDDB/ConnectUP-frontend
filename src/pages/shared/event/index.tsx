import Reviews from "../../../components/event/reviews";
import Questions from "../../../components/event/questions";
import EventHeader from "../../../components/event/header";
import EventDetails from "../../../components/event/details";
import EventLocation from "../../../components/event/location";
import EventStatistics from "../../../components/event/statistics";
import { useParams } from "react-router-dom";
import { useGetEventById } from "../../../features/events/hooks";
import {
    MainContainer,
    DividerWrapper,
    ReviewsWrapper,
    QuestionsWrapper,
    ContainersDivider,
    BottomMainContainer,
    MiddleMainContainer,
    MiddleInnerContainer,
    EventMetadataContainer
} from "./styles";

function Event() {
    const { id } = useParams<{ id: string }>();

    const { event, isLoading } = useGetEventById(id);

    if (!event || isLoading) {
        return <div>Loading...</div>;
    }

    const {
        lat,
        lng,
        host,
        title,
        endDate,
        address,
        reviews,
        imageUri,
        startDate,
        questions,
        paidEvent,
        attendees,
        description
    } = event;

    return (
        <MainContainer>
            <EventHeader
                host={host}
                title={title}
                paidEvent={paidEvent}
                attendees={attendees}
            />
            <MiddleMainContainer>
                <MiddleInnerContainer>
                    <EventDetails
                        tags={event.tags}
                        host={event.host}
                        title={title}
                        gallery={event.gallery}
                        imageUri={event.imageUri}
                        attendees={event.attendees}
                        description={event.description}
                    />
                    <EventMetadataContainer>
                        <EventLocation
                            lat={lat}
                            lng={lng}
                            title={title}
                            endDate={endDate}
                            address={address}
                            imageUri={imageUri}
                            startDate={startDate}
                            description={description}
                        />
                        <EventStatistics />
                    </EventMetadataContainer>
                </MiddleInnerContainer>
            </MiddleMainContainer>
            <DividerWrapper>
                <ContainersDivider />
            </DividerWrapper>
            <BottomMainContainer>
                <ReviewsWrapper>
                    <Reviews reviews={reviews} />
                </ReviewsWrapper>
                <ContainersDivider />
                <QuestionsWrapper>
                    <Questions questions={questions} />
                </QuestionsWrapper>
            </BottomMainContainer>
        </MainContainer >
    );
}

export default Event;