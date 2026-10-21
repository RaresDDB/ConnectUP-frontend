import TypeUtils from "../../utils/type-utils";
import { QuestionsState } from "./types";
import { QuestionsFunctionality } from "./enums";

const initialState: QuestionsState = {
    messages: TypeUtils.initRecord(Object.values(QuestionsFunctionality), null),
    statuses: TypeUtils.initRecord(Object.values(QuestionsFunctionality), null),
    severities: TypeUtils.initRecord(Object.values(QuestionsFunctionality), null)
}

export default initialState;