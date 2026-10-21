import Question from "./question";
import { useParams } from "react-router-dom";
import { createQuestion } from "../../../features/questions/thunks";
import { useGetAllMembers } from "../../../features/members/hooks";
import { useCreateQuestion } from "../../../features/questions/hooks";
import {
    Data,
    QuestionsProps
} from "./types";
import {
    useAppDispatch,
    useAppSelector
} from "../../../store";
import {
    useRef,
    useState,
    FormEvent,
    useEffect,
    ChangeEvent
} from "react";
import {
    Form,
    AddButton,
    InputField,
    MentionItem,
    MainContainer,
    NoQuestionsText,
    MentionHighlight,
    MentionsDropdown,
    TextInputWrapper,
    QuestionsContainer
} from "./styles";

const defaultData = {
    title: "",
    text: "",
    mentionedUsernames: []
}

const defaultErrors = {
    title: "",
    text: ""
}

function Questions(props: QuestionsProps) {
    const { questions } = props;

    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    const user = useAppSelector(state => state.auth.user);

    const { members } = useGetAllMembers();

    const memberUsernames = members.map(member => member.username).filter(username => username !== user?.username);

    const textFieldRef = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<Data>(defaultData);
    const [errors, setErrors] = useState(defaultErrors);
    const [showMentions, setShowMentions] = useState(false);
    const [mentionQuery, setMentionQuery] = useState("");
    const [filteredUsernames, setFilteredUsernames] = useState<string[]>([]);

    useCreateQuestion();

    useEffect(() => {
        if (!mentionQuery) {
            setFilteredUsernames(memberUsernames);
            return;
        }

        const filtered = memberUsernames.filter(username => username.toLowerCase().includes(mentionQuery.toLowerCase()));
        setFilteredUsernames(filtered);
    }, [members, mentionQuery]);

    // Helper function to extract all mentions from text
    const extractMentionsFromText = (text: string): string[] => {
        // Match @username pattern (username can contain letters, numbers, and underscores)
        const mentionRegex = /@([\w.]+)/g;

        // Find all matches in the text
        const matches = text.match(mentionRegex) || [];

        // Extract usernames without the @ symbol
        return matches.map(match => match.substring(1));
    };

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            title: e.target.value
        })

        if (e.target.value === "") {
            setErrors({
                ...errors,
                title: "Title is required"
            })
            return;
        }

        setErrors({
            ...errors,
            title: ""
        })
    }

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;

        // Extract current mentions from the text
        const currentMentionsInText = extractMentionsFromText(newText);

        console.log(currentMentionsInText, "currentMentionsInText");

        // Filter out mentions that are no longer in the text
        const updatedMentionedMembers = data.mentionedUsernames.filter(
            username => currentMentionsInText.includes(username)
        );

        setData({
            ...data,
            text: newText,
            mentionedUsernames: updatedMentionedMembers
        });

        const lastAtIndex = newText.lastIndexOf('@');
        const cursorPosition = e.target.selectionStart || 0;

        // Check if we're in a valid mention context
        if (lastAtIndex !== -1 && (lastAtIndex === 0 || newText[lastAtIndex - 1] === ' ')) {
            // Check if cursor is after @ but before a space
            const textFromAtToEnd = newText.substring(lastAtIndex, cursorPosition);
            const hasSpaceAfterAt = textFromAtToEnd.includes(' ');

            if (cursorPosition > lastAtIndex && !hasSpaceAfterAt) {
                const query = newText.substring(lastAtIndex + 1, cursorPosition);
                setMentionQuery(query);
                setShowMentions(true);
            } else {
                setShowMentions(false);
            }
        } else {
            setShowMentions(false);
        }

        if (newText === "") {
            setErrors({
                ...errors,
                text: "Text is required"
            })
            return;
        }

        setErrors({
            ...errors,
            text: ""
        })
    }

    const handleSelectMention = (username: string) => {
        const lastAtIndex = data.text.lastIndexOf('@');
        const cursorPosition = textFieldRef.current?.selectionStart || 0;

        if (lastAtIndex !== -1) {
            const textBefore = data.text.substring(0, lastAtIndex);
            const textAfter = data.text.substring(cursorPosition);
            const newText = textBefore + '@' + username + ' ' + textAfter;

            // Add username to the mentioned users array if not already there
            const updatedMentionedMembers = [...data.mentionedUsernames];
            if (!updatedMentionedMembers.includes(username)) {
                updatedMentionedMembers.push(username);
            }

            setData({
                ...data,
                text: newText,
                mentionedUsernames: updatedMentionedMembers
            });

            setShowMentions(false);

            setTimeout(() => {
                if (textFieldRef.current) {
                    textFieldRef.current.focus();
                    const newPosition = lastAtIndex + username.length + 2;
                    textFieldRef.current.setSelectionRange(newPosition, newPosition);
                }
            }, 0);
        }
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        id && dispatch(
            createQuestion({
                title: data.title,
                text: data.text,
                mentionedUsernames: data.mentionedUsernames,
                eventId: id
            })
        );

        setData(defaultData);
    }

    return (
        <MainContainer>
            <Form onSubmit={handleFormSubmit}>
                <InputField
                    size="small"
                    placeholder="Add question title..."
                    onChange={handleChangeTitle}
                    value={data.title}
                    error={errors.title !== ""}
                    helperText={errors.title}
                />
                <TextInputWrapper>
                    <InputField
                        inputRef={textFieldRef}
                        size="small"
                        placeholder="Add question text... (Use @ to mention users)"
                        multiline
                        rows={4}
                        value={data.text}
                        onChange={handleChangeText}
                        error={errors.text !== ""}
                        helperText={errors.text}
                    />

                    {showMentions && (
                        <MentionsDropdown>
                            {filteredUsernames.length > 0 ? (
                                filteredUsernames.map((username, index) => (
                                    <MentionItem
                                        key={index}
                                        onClick={() => { handleSelectMention(username); }}
                                    >
                                        <MentionHighlight>@{username}</MentionHighlight>
                                    </MentionItem>
                                ))
                            ) : (
                                <MentionItem>No users found</MentionItem>
                            )}
                        </MentionsDropdown>
                    )}
                </TextInputWrapper>
                <AddButton size="small" variant="contained" type="submit">
                    Add question
                </AddButton>
            </Form>
            <QuestionsContainer>
                {
                    questions.length > 0
                        ? (
                            questions.map((question, index) => (
                                <Question key={index} {...question} />
                            ))
                        )
                        : (
                            <NoQuestionsText>There are no questions posted yet, you can be first!</NoQuestionsText>
                        )
                }
            </QuestionsContainer>
        </MainContainer>
    )
}

export default Questions;