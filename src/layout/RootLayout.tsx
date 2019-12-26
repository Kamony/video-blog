import * as React from "react"
// import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "../theme/"

type Props = {
  children: React.ReactNode
}

export default function TopLayout(props: Props) {
  return (
    <React.Fragment>
      {/*<Helmet>*/}
      {/*  <meta*/}
      {/*    name="viewport"*/}
      {/*    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"*/}
      {/*  />*/}
      {/*  <link*/}
      {/*    href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"*/}
      {/*    rel="stylesheet"*/}
      {/*  />*/}
      {/*</Helmet>*/}
      <ThemeProvider theme={theme(false)}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </React.Fragment>
  )
}
