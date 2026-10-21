import { ReactNode } from "react";

export interface AccountMenuItemProps {
    to: string;
    icon: ReactNode;
    text: string;
    onClick?: () => void;
}