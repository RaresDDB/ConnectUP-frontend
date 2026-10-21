export const ACTIONS = {
    REGISTER: {
        SUCCESS: 'auth/register/fulfilled',
        FAILURE: 'auth/register/rejected'
    },
    ACTIVATE: {
        SUCCESS: 'auth/activate/fulfilled',
        FAILURE: 'auth/activate/rejected'
    },
    LOGIN: {
        SUCCESS: 'auth/login/fulfilled',
        FAILURE: 'auth/login/rejected'
    },
    LOGOUT: {
        SUCCESS: 'auth/logout/fulfilled',
        FAILURE: 'auth/logout/rejected'
    },
    UPDATE_BY_ID: {
        SUCCESS: 'api/users/updateById/fulfilled',
        FAILURE: 'api/users/updateById/rejected'
    },
    CONFIRM: {
        EMAIL: 'auth/confirmChangeEmail/fulfilled',
        PASSWORD: 'auth/confirmChangePassword/fulfilled'
    },
    CHANGE_EMAIL: {
        SUCCESS: 'auth/changeEmail/fulfilled',
        FAILURE: 'auth/changeEmail/rejected'
    },
    CHANGE_PASSWORD: {
        SUCCESS: 'auth/changePassword/fulfilled',
        FAILURE: 'auth/changePassword/rejected'
    },
    CONFIRM_CHANGE_EMAIL: {
        SUCCESS: 'auth/confirmChangeEmail/fulfilled',
        FAILURE: 'auth/confirmChangeEmail/rejected'
    },
    CONFIRM_CHANGE_PASSWORD: {
        SUCCESS: 'auth/confirmChangePassword/fulfilled',
        FAILURE: 'auth/confirmChangePassword/rejected'
    },
    FORGOT_PASSWORD: {
        SUCCESS: 'auth/forgotPassword/fulfilled',
        FAILURE: 'auth/forgotPassword/rejected'
    },
    RESET_PASSWORD: {
        SUCCESS: 'auth/resetPassword/fulfilled',
        FAILURE: 'auth/resetPassword/rejected'
    },
    CREATE_EVENT: {
        SUCCESS: 'events/create/fulfilled',
        FAILURE: 'events/create/rejected'
    },
    DELETE_EVENT: {
        SUCCESS: 'events/deleteById/fulfilled',
        FAILURE: 'events/deleteById/rejected'
    },
    ATTEND_TO_EVENT: {
        SUCCESS: 'events/attend/fulfilled',
        FAILURE: 'events/attend/rejected'
    },
    UNATTEND_TO_EVENT: {
        SUCCESS: 'events/unattend/fulfilled',
        FAILURE: 'events/unattend/rejected'
    },
    ADD_EVENT_TO_FAVORITES: {
        SUCCESS: 'events/addToFavorites/fulfilled',
        FAILURE: 'events/addToFavorites/rejected'
    },
    REMOVE_EVENT_FROM_FAVORITES: {
        SUCCESS: 'events/removeFromFavorites/fulfilled',
        FAILURE: 'events/removeFromFavorites/rejected'
    },
    CREATE_REVIEW: {
        SUCCESS: 'reviews/create/fulfilled',
        FAILURE: 'reviews/create/rejected'
    },
    CREATE_QUESTION: {
        SUCCESS: 'questions/create/fulfilled',
        FAILURE: 'questions/create/rejected'
    },
    CREATE_PAYMENT: {
        SUCCESS: 'payments/create/fulfilled',
        FAILURE: 'payments/create/rejected'
    }
} as const;