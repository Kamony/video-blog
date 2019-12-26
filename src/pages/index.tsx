import * as React from "react"
import { graphql, Link } from "gatsby"
import { Grid } from "@material-ui/core"
import FeaturedPost from "../components/FeaturedPost"
import MainFeaturedPost from "../components/MainFeaturedPost"

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageTitle: "main image description",
  date: "13.12.2018",
  tags: ["free", "biology"],
}

export default props => {
  console.log(props)

  return (
    <>
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={4}>
          <FeaturedPost post={mainFeaturedPost} />
          <FeaturedPost post={mainFeaturedPost} />
        </Grid>
        <ul>
          {props.data.allMarkdownRemark.edges.map(edge => (
            <li key={edge.node.id}>
              <Link to={edge.node.frontmatter.path}>
                {edge.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            path
            date
            tags_
          }
        }
      }
    }
  }
`
