import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
    }
    interface PaletteOptions {
    }
}

export default createTheme({
    palette: {
        primary: {
            main: '#e53869',
            dark: '#E32359',
            light: '#F65858'
        }
    }
});