import * as React from "react"
import { graphql } from "gatsby"
import {
  Breadcrumbs,
  Container,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { TagsList } from "../components/TagsList"
import { Link } from "../components/Link"
import Video from "../components/video"
const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
  },
}))

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const classes = useStyles()
  return (
    <main className={classes.container}>
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link to={"/"}>Home</Link>
        <Typography color="textPrimary">{frontmatter.title}</Typography>
      </Breadcrumbs>
      <Container className={classes.container}>
        <Typography variant="h2" align={"center"}>
          {frontmatter.title}
        </Typography>
        <Typography variant="subtitle1" align={"center"}>
          {frontmatter.date.toLocaleString()}
        </Typography>
        {frontmatter.tags_ && <TagsList tags={frontmatter.tags_} />}
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
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        video
        tags_
      }
    }
  }
`
