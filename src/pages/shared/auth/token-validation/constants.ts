import { ROUTES } from "../../../../constants/route-constants";

export const TOKEN_VALIDATION = {
    REDIRECTS: {
        [ROUTES.ACTIVATE.path]: ROUTES.REGISTER.path,
        [ROUTES.RESET_PASSWORD.path]: ROUTES.FORGOT_PASSWORD.path,
        DEFAULT: ROUTES.REGISTER.path
    }
} as const;