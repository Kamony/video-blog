import { makeStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const sectionQuery = graphql`
  query SectionsQuery {
    allFile(filter: { sourceInstanceName: { eq: "markdown-sections" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              section
              color
            }
          }
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

type Props = { section: string }

export const SectionLabel = (props: Props) => {
  const data = useStaticQuery(sectionQuery)
  const classes = useStyles()
  const currentSection = data.allFile.edges.find(
    edge => edge.node.childMarkdownRemark.frontmatter.section === props.section
  )

  if (!currentSection) {
    return null
  }

  return (
    <div
      className={classes.section}
      style={{
        backgroundColor:
          currentSection.node.childMarkdownRemark.frontmatter.color,
      }}
    >
      <div>
        <Typography variant="overline">{props.section}</Typography>
      </div>
    </div>
  )
}
