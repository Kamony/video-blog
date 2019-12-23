import React from "react"
import { graphql } from "gatsby"
import Video from "../components/video"

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  console.log('output: ', frontmatter, html, data );
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div style={{ height: 500, width: '100%' }}>
        <Video videoSrcURL={frontmatter.videoUrl} videoTitle={'testovaci video'} />
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
            }
        }
    }
`
