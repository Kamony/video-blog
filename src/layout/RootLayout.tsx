import * as React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../theme/"
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

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

export default function TopLayout(props: Props) {
  const classes = useStyles()
  const [isDarkMode, setDarkMode] = React.useState(false)
  const [renderer, setRenderer] = React.useState(false)

  React.useEffect(() => {
    setRenderer(true)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode)
  }

  return (
    renderer && (
      <ThemeProvider theme={theme(isDarkMode)}>
        <CssBaseline />
        <Header
          title="Video Learning Platform"
          sections={sections}
          isDarkMode={isDarkMode}
          onChangeTheme={toggleDarkMode}
        />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
    )
  )
}
