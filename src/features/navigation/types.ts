import { ROUTES } from "../../constants/route-constants";

export interface NavigationState {
    url: string | null;
    params?: Record<string, any>;
    replace?: boolean;
}

export type NavigationRules = {
    [key: string]: NavigateAction;
};

export interface NavigateAction {
    url: string;
    replace?: boolean;
    params?: Record<string, any>;
}

export type Route = keyof typeof ROUTES;