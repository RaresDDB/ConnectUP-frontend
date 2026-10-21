import UserAvatar from "../../user-avatar";
import { EventHeaderProps } from "./types";
import {
    Title,
    Price,
    HostedBy,
    PlacesLeft,
    HostedByText,
    NameContainer,
    AvatarWrapper,
    HostContainer,
    MainContainer,
    InnerContainer,
    VerticalDivider,
    WrapperContainer,
    PaidEventContainer
} from "./styles";

function EventHeader(props: EventHeaderProps) {
    const { host, title, attendees, paidEvent } = props;

    return (
        <MainContainer>
            <InnerContainer>
                <Title>{title}</Title>
                <WrapperContainer>
                    <HostContainer>
                        <AvatarWrapper>
                            <UserAvatar size={50} user={host} />
                        </AvatarWrapper>
                        <NameContainer>
                            <HostedByText>Hosted by</HostedByText>
                            <HostedBy>{`${host.firstName} ${host.lastName}`}</HostedBy>
                        </NameContainer>
                    </HostContainer>
                    {paidEvent && (
                        <PaidEventContainer>
                            <Price>
                                {`${paidEvent.price} ${paidEvent.currency}`}
                            </Price>
                            <VerticalDivider role="separator" orientation="vertical" />
                            <PlacesLeft>
                                {`${paidEvent.maxAttendees - attendees.length} places left`}
                            </PlacesLeft>
                        </PaidEventContainer>
                    )}
                </WrapperContainer>
            </InnerContainer>
        </MainContainer>
    )
}

export default EventHeader;