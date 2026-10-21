import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";

export const MainContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    padding: '32px'
});

export const InnerContainer = styled('div')({
    width: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
})

export const Title = styled('h2')({
});

export const WrapperContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

export const HostContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
});

export const PaidEventContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
});

export const VerticalDivider = styled(Divider)({
    height: '24px',
    borderWidth: '1px'
});

export const Price = styled('span')({});

export const PlacesLeft = styled('span')({});

export const AvatarWrapper = styled('div')({
});

export const NameContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
});

export const HostedByText = styled('span')({
});

export const HostedBy = styled('span')({
    fontWeight: '900'
});