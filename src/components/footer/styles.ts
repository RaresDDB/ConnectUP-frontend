import { styled } from "@mui/material/styles";

export const Container = styled('footer')({
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
});

export const Text = styled('span')({
    fontSize: '16px'
})