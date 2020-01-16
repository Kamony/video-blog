import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

// A custom theme for this app
export const theme = (isDarkMode: boolean) => createMuiTheme( {
  palette: {
    type: isDarkMode ? 'dark' : 'light',
    primary: {
      main: '#0097a7',
    },
    secondary: {
      main: '#ff4081',
    },
    error: {
      main: red.A400,
    },
  },
});
