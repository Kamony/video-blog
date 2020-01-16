import * as React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Link } from "../components/Link"
import { Home } from "@material-ui/icons"
import FeaturedPost from "../components/FeaturedPost"

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderTopWidth: 5,
    borderTopStyle: "solid",
    borderBottomWidth: 5,
    borderBottomStyle: "solid",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  breadCrumbs: {
    alignItems: "baseline",
    paddingBottom: theme.spacing(2),
  },
  gutter: {
    paddingTop: theme.spacing(2),
  },
}))

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark
  const classes = useStyles()

  return (
    <main
      className={classes.container}
      style={{ borderColor: frontmatter.color }}
    >
      <Breadcrumbs
        maxItems={2}
        aria-label="breadcrumb"
        separator={">"}
        className={classes.breadCrumbs}
        style={{ alignItems: "baseline" }}
      >
        <Link to={"/"} style={{ color: "inherit", display: "flex" }}>
          <Home color={"inherit"} className={classes.icon} />
          Home
        </Link>
        <Typography color="textPrimary">{frontmatter.section}</Typography>
      </Breadcrumbs>
      <Grid container spacing={4} justify="space-around">
        {data.allMarkdownRemark.edges.map(post => (
          <FeaturedPost
            key={post.node.frontmatter.title}
            post={{
              title: post.node.frontmatter.title,
              date: new Date(post.node.frontmatter.date).toLocaleDateString(),
              description: post.node.frontmatter.lead,
              image: "https://source.unsplash.com/random",
              imageTitle: "main image description",
              section: post.node.frontmatter.section_,
              path: post.node.fields.slug,
            }}
          />
        ))}
      </Grid>
      <Grid container spacing={5}>
        <Grid item className={classes.gutter}>
          <Typography variant="h6" gutterBottom>
            {frontmatter.section}
          </Typography>
          <Divider />
          <Box mt={1}>
            <Typography paragraph gutterBottom>
              {frontmatter.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </main>
  )
}

export const pageQuery = graphql`
  query($section: String!) {
    allMarkdownRemark(filter: { frontmatter: { section_: { eq: $section } } }) {
      edges {
        node {
          frontmatter {
            featured
            date
            lead
            title
            video
            section_
          }
          fields {
            slug
          }
        }
      }
    }
    markdownRemark(frontmatter: { section: { eq: $section } }) {
      frontmatter {
        section
        color
        description
      }
    }
  }
`
