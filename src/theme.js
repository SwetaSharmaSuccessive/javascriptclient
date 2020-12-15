import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'sans-serif',
      'Comic Sans MS',
      'cursive',
    ].join(','),
    htmlFontSize: 10,
  },
});
export default theme;
