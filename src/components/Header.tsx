import * as React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import {
  Brightness2 as DarkMode,
  Brightness7 as LightMode,
} from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"
import { Paper } from "@material-ui/core"
import { Search } from "./Search"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "./Link"

const sectionsQuery = graphql`
  query MyQuery {
    allFile(filter: { sourceInstanceName: { eq: "markdown-sections" } }) {
      edges {
        node {
          dir
          childMarkdownRemark {
            frontmatter {
              section
              color
              slug
            }
          }
        }
      }
    }
  }
`

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

type Props = {
  title: string
  onChangeTheme: () => void
  isDarkMode: boolean
}

export default function Header(props: Props) {
  const classes = useStyles()
  const { title } = props
  const data = useStaticQuery(sectionsQuery)

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
        {data.allFile.edges.map((edge, key) => (
          <Link key={key} to={edge.node.childMarkdownRemark.frontmatter.slug}>
            <Typography
              color="textPrimary"
              noWrap
              variant="body2"
              className={classes.toolbarLink}
            >
              {edge.node.childMarkdownRemark.frontmatter.section}
            </Typography>
          </Link>
        ))}
      </Toolbar>
    </Paper>
  )
}
