import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 450,
            md: 600,
            lg: 960,
            xl: 1280
        }
    }
});

export default theme;