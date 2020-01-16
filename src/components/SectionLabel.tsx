import { makeStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const sectionQuery = graphql`
  query SectionQuery {
    file(childMarkdownRemark: { frontmatter: { section: { eq: "Biology" } } }) {
      childMarkdownRemark {
        frontmatter {
          section
          color
        }
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  section: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(2),
    opacity: 0.8,
    backgroundColor: "green",
    height: "100%",
    "&>div": {
      transform: "rotate(-90deg)",
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(4),
    },
  },
}))

type Props = {}
const SectionLabel = (props: Props) => {
  const data = useStaticQuery(sectionQuery)
  return (
    <div
      className={classes.section}
      style={{ backgroundColor: post.sectionColor }}
    >
      <div>
        <Typography variant="overline">{post.section}</Typography>
      </div>
    </div>
  )
}
