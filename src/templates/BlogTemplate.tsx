import * as React from "react"
import { graphql } from "gatsby"
import {
  Breadcrumbs,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { TagsList } from "../components/TagsList"
import { Link } from "../components/Link"
import { Video } from "../components/Video"
import { Home } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  tagsContainer: {
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}))

export default function Template({ data }) {
  console.log(data)
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const classes = useStyles()

  return (
    <main className={classes.container}>
      <Breadcrumbs
        maxItems={3}
        aria-label="breadcrumb"
        separator={">"}
        style={{ alignItems: "baseline" }}
      >
        <Link to={"/"} style={{ color: "inherit", display: "flex" }}>
          <Home color={"inherit"} className={classes.icon} />
          Home
        </Link>
        <Link
          to={`/${frontmatter.section_}`.toLowerCase()}
          style={{ color: "inherit", display: "flex" }}
        >
          {frontmatter.section_}
        </Link>
        <Typography color="textPrimary">{frontmatter.title}</Typography>
      </Breadcrumbs>
      <Container className={classes.container}>
        <Typography variant="subtitle1" align={"right"}>
          {frontmatter.date.toLocaleString()}
        </Typography>
        <Typography variant="subtitle1" align={"right"}>
          {frontmatter.section_}
        </Typography>
        <Typography variant="h2" align={"center"} gutterBottom>
          {frontmatter.title}
        </Typography>
        {frontmatter.tags_ && (
          <TagsList
            tags={frontmatter.tags_}
            className={classes.tagsContainer}
          />
        )}
        <Typography
          variant="subtitle1"
          gutterBottom
          paragraph
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Video videoSrcURL={frontmatter.video} videoTitle={"testovaci video"} />
      </Container>
    </main>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        video
        tags_
        section_
      }
    }
  }
`
