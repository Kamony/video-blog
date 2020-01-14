import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

// A custom theme for this app
export const theme = (isDarkMode: boolean) => createMuiTheme( {
  palette: {
    type: isDarkMode ? 'dark' : 'light',
    primary: {
      main: '#608bff',
    },
    secondary: {
      main: '#28e9df',
    },
    error: {
      main: red.A400,
    },
  },
});
