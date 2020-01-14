import * as React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import {
  Brightness7 as LightMode,
  Brightness2 as DarkMode,
} from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import { Paper } from "@material-ui/core"
import { Search } from "./Search"

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  container: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    opacity: 0.85,
    backdropFilter: "blur(20px)",
  },
}))

type Section = {
  title: string
  url: string
}

type Props = {
  sections: Section[]
  title: string
  onChangeTheme: () => void
  isDarkMode: boolean
}

export default function Header(props: Props) {
  const classes = useStyles()
  const { sections, title } = props

  return (
    <Paper
      variant="outlined"
      square
      className={classes.container}
      elevation={10}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="primary"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Search />
        <IconButton onClick={props.onChangeTheme}>
          {props.isDarkMode ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </Paper>
  )
}
