import * as React from "react"
import { graphql, Link } from "gatsby"
import Video from "../components/video"
import { Button, useTheme } from "@material-ui/core"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { colors } = useTheme()
  console.log(colors)
  return (
    <div className="blog-post-container">
      <Button variant="contained" color="primary">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          Back
        </Link>
      </Button>
      <Link to={"/"}>Back</Link>
      <div className="blog-post">
        <h1 style={{ color: "red" }}>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div style={{ maxHeight: 500 }}>
          <Video
            videoSrcURL={frontmatter.video}
            videoTitle={"testovaci video"}
          />
        </div>
      </div>
    </div>
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
      }
    }
  }
`
