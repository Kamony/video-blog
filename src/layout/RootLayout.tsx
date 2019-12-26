import * as React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "../theme/"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Container } from "@material-ui/core"

const sections = [
  { title: "Technology", url: "test" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
]

type Props = {
  children: React.ReactNode
}

export default function TopLayout(props: Props) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme(false)}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Video Learning Platform" sections={sections} />
          {props.children}
        </Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
    </React.Fragment>
  )
}
