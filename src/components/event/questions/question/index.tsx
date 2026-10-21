import DateUtils from "../../../../utils/date-utils";
import UserAvatar from "../../../user-avatar";
import { QuestionProps } from "./types";
import {
    Name,
    Date,
    Text,
    Title,
    MainContainer,
    UserContainer,
    QuestionContainer
} from "./styles";

function Question(props: QuestionProps) {
    const { title, text, postedAt, member } = props;

    const { firstName, lastName } = member;

    return (
        <MainContainer>
            <UserContainer>
                <UserAvatar size={54} user={member} />
                <Name>{`${firstName} ${lastName}`}</Name>
                <Date>{DateUtils.formatDate(postedAt)}</Date>
            </UserContainer>
            <QuestionContainer>
                <Title>{title}</Title>
                <Text>{text}</Text>
            </QuestionContainer>
        </MainContainer>
    )
}

export default Question;