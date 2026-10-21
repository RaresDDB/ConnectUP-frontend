import { Question } from "../../../types/question-types";

export interface Data {
    title: string;
    text: string;
    mentionedUsernames: string[];
}

export interface QuestionsProps {
    questions: Question[]
}