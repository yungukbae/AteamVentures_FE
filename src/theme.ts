import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#2196F3',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#fce7e7',
        },
    },
});

export default theme;