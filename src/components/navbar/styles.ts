import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { RouterLink } from '../../styles/shared/styles';
import { LuHeartHandshake } from 'react-icons/lu';

export const MainContainer = styled('header')({
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.08), 0px 2px 2px 0px rgba(0,0,0,0.005), 0px 1px 4px 0px rgba(0,0,0,0.1)",
    padding: "0 32px"
});

export const Nav = styled('nav')({
    width: '1200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

export const LeftContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
});

export const HomeLink = styled(RouterLink)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: theme.palette.primary.light
}))

export const LogoIcon = styled(LuHeartHandshake)({
    fontSize: "30px"
})

export const LogoText = styled('h3')({
    fontSize: "20px",
    fontWeight: "500"
})

export const AutocompleteContainer = styled('div')({
    display: 'flex',
    alignItems: 'center'
})

export const InputField = styled(TextField)({
    width: '300px',
    "& input": {
        padding: '6.5px 12px'
    }
});

export const AutocompleteIconWrapper = styled('div')(({ theme }) => ({
    color: '#fff',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    backgroundColor: theme.palette.primary.light,
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px'
}))

export const IconButtonsContainer = styled('div')({
    display: 'flex'
})

export const IconButtonWrapper = styled('div')({
    display: 'flex'
})