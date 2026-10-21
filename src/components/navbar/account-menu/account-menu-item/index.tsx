import { MenuItem } from "../styles";
import { AccountMenuItemProps } from "./types";
import {
    ItemIcon,
    ItemText,
    LinkItem
} from "./styles";

function AccountMenuItem(props: AccountMenuItemProps) {
    const { to, icon, text, onClick } = props;

    return (
        <MenuItem>
            <LinkItem to={to} onClick={onClick}>
                <ItemIcon>{icon}</ItemIcon>
                <ItemText>{text}</ItemText>
            </LinkItem>
        </MenuItem>
    );
}

export default AccountMenuItem;