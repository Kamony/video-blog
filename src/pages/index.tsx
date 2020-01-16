import * as React from "react"
import { graphql } from "gatsby"
import { Grid, makeStyles } from "@material-ui/core"
import FeaturedPost from "../components/FeaturedPost"
import MainFeaturedPost from "../components/MainFeaturedPost"
import { About } from "../components/About"
import Sidebar from "../components/SideBar"
import { Facebook, Instagram, Twitter, YouTube } from "@material-ui/icons"

const social = [
  { name: "Youtube", icon: YouTube, href: "https://youtube.com" },
  { name: "Twitter", icon: Twitter },
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
]

const useStyles = makeStyles(theme => ({
  mainGrid: {
    paddingTop: theme.spacing(3),
  },
}))

export default props => {
  const classes = useStyles()

  const mainFeaturedPost = props.data.allMarkdownRemark.edges[0].node
  return (
    <>
      <main>
        {props.data.allMarkdownRemark.edges.length > 0 && (
          <MainFeaturedPost
            post={{
              title: mainFeaturedPost.frontmatter.title,
              date: new Date(
                mainFeaturedPost.frontmatter.date
              ).toLocaleDateString(),
              tags: mainFeaturedPost.frontmatter.tags_,
              description: mainFeaturedPost.frontmatter.lead,
              image: "https://source.unsplash.com/random",
              imageTitle: "main image description",
              path: mainFeaturedPost.fields.slug,
              section: mainFeaturedPost.frontmatter.section_,
            }}
          />
        )}
        <Grid container spacing={4} justify="space-around">
          {props.data.allMarkdownRemark.edges.slice(1).map(post => (
            <FeaturedPost
              key={post.node.id}
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
        <Grid container spacing={5} className={classes.mainGrid}>
          <About />
          <Sidebar
            title={"About Me"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
            social={social}
          />
        </Grid>
      </main>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { featured: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            lead
            tags_
            section_
          }
          fields {
            slug
          }
        }
      }
    }
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
