import UserAvatar from "../user-avatar";
import AccountMenu from "./account-menu";
import { Role } from "../../enums/role-enums";
import { ROUTES } from "../../constants/route-constants";
import { useAppSelector } from "../../store";
import {
    Tooltip,
    IconButton
} from "@mui/material";
import {
    useState,
    MouseEvent
} from "react";
import {
    Nav,
    LogoText,
    LogoIcon,
    HomeLink,
    MainContainer,
    LeftContainer,
    IconButtonWrapper,
    IconButtonsContainer
} from "./styles";

function Navbar() {
    const user = useAppSelector(state => state.auth.user);

    const [openAccountMenu, setOpenAccountMenu] = useState(false);

    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);

    const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(e.currentTarget);
        setOpenAccountMenu(true);
    }

    const handleCloseMenu = () => {
        setAnchorElement(null);
        setOpenAccountMenu(false);
    }

    const getHomeLink = () => {
        if (!user) {
            return ROUTES.LOGIN.path;
        }

        if (user.role.name === Role.Admin) {
            return ROUTES.MANAGE_EVENTS.path;
        }

        return ROUTES.NEARBY_EVENTS.path;
    }

    return (
        <MainContainer>
            <Nav>
                <LeftContainer>
                    <HomeLink to={getHomeLink()}>
                        <LogoIcon />
                        <LogoText>
                            ConnectUp
                        </LogoText>
                    </HomeLink>
                </LeftContainer>
                <IconButtonsContainer>
                    <IconButtonWrapper>
                        <Tooltip arrow title='Account'>
                            <IconButton
                                size='small'
                                edge='end'
                                color='inherit'
                                onClick={handleOpenMenu}
                            >
                                <UserAvatar
                                    user={user}
                                    size={50}
                                />
                            </IconButton>
                        </Tooltip>
                        <AccountMenu
                            user={user}
                            isOpen={openAccountMenu}
                            anchorElement={anchorElement}
                            handleCloseMenu={handleCloseMenu}
                        />
                    </IconButtonWrapper>
                </IconButtonsContainer>
            </Nav>
        </MainContainer>
    );
}

export default Navbar;