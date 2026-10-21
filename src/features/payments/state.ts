import TypeUtils from "../../utils/type-utils";
import { PaymentsState } from "./types";
import { PaymentsFunctionality } from "./enums";

const initialState: PaymentsState = {
    clientSecret: null,
    messages: TypeUtils.initRecord(Object.values(PaymentsFunctionality), null),
    statuses: TypeUtils.initRecord(Object.values(PaymentsFunctionality), null),
    severities: TypeUtils.initRecord(Object.values(PaymentsFunctionality), null)
}

export default initialState;