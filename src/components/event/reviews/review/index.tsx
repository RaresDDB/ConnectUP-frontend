import DateUtils from "../../../../utils/date-utils";
import UserAvatar from "../../../user-avatar";
import { Rating } from "@mui/material";
import { ReviewProps } from "./types";
import {
    Name,
    Date,
    Text,
    Title,
    MainContainer,
    UserContainer,
    ReviewContainer
} from "./styles";

function Review(props: ReviewProps) {
    const { title, text, rating, postedAt, member } = props;

    const { firstName, lastName } = member;

    return (
        <MainContainer>
            <UserContainer>
                <UserAvatar size={54} user={member} />
                <Name>{`${firstName} ${lastName}`}</Name>
                <Date>{DateUtils.formatDate(postedAt)}</Date>
            </UserContainer>
            <ReviewContainer>
                <Title>{title}</Title>
                <Rating
                    size="small"
                    value={rating}
                    readOnly
                >
                </Rating>
                <Text>{text}</Text>
            </ReviewContainer>
        </MainContainer>
    )
}

export default Review;