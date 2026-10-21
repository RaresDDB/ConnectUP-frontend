import BaseAvatar from "../../base-avatar";
import UserAvatar from "../../user-avatar";
import { EventAttendeesProps } from "./types";
import {
    AttendMore,
    AttendeeCard,
    AttendeeName,
    AttendeeRole,
    CardsContainer,
    AttendeesTitle,
    AttendeesContainer
} from "./styles";

function EventAttendees(props: EventAttendeesProps) {
    const { host, attendees } = props;

    return (
        <AttendeesContainer>
            <AttendeesTitle>
                Attendees ({attendees.length})
            </AttendeesTitle>
            <CardsContainer>
                {
                    attendees.slice(0, 4).map((attendee, index) => (
                        <AttendeeCard key={index}>
                            <UserAvatar size={75} user={attendee} />
                            <AttendeeName>
                                {attendee.firstName.split(" ")[0]}
                            </AttendeeName>
                            <AttendeeRole>
                                {host.id === attendee.id ? 'Host' : 'Member'}
                            </AttendeeRole>
                        </AttendeeCard>
                    ))
                }
                {
                    attendees.length >= 5 && (
                        <AttendeeCard>
                            <BaseAvatar
                                size={75}
                                name={'+5'}
                                imageUri={null}
                                showFullName={true}
                            />
                            <AttendMore>+5 more</AttendMore>
                        </AttendeeCard>
                    )
                }
            </CardsContainer>
        </AttendeesContainer>
    )
};

export default EventAttendees;