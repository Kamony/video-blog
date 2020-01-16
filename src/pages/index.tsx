import * as React from "react"
import { graphql } from "gatsby"
import { Grid, makeStyles } from "@material-ui/core"
import FeaturedPost from "../components/FeaturedPost"
import MainFeaturedPost from "../components/MainFeaturedPost"
import { About } from "../components/About"
import Sidebar from "../components/SideBar"
import { Facebook, Instagram, Twitter, YouTube } from "@material-ui/icons"
import { createBlogSlug } from "../utils"

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
  return (
    <>
      <main>
        {props.data.allMarkdownRemark.edges.length > 0 && (
          <MainFeaturedPost
            post={{
              title:
                props.data.allMarkdownRemark.edges[0].node.frontmatter.title,
              date: new Date(
                props.data.allMarkdownRemark.edges[0].node.frontmatter.date
              ).toLocaleDateString(),
              tags:
                props.data.allMarkdownRemark.edges[0].node.frontmatter.tags_,
              description:
                props.data.allMarkdownRemark.edges[0].node.frontmatter.lead,
              image: "https://source.unsplash.com/random",
              imageTitle: "main image description",
              path: createBlogSlug(
                props.data.allMarkdownRemark.edges[0].node.frontmatter.path,
                props.data.allMarkdownRemark.edges[0].node.frontmatter.section_
              ),
              section:
                props.data.allMarkdownRemark.edges[0].node.frontmatter.section_,
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
                path: createBlogSlug(
                  post.node.frontmatter.path,
                  post.node.frontmatter.section_
                ),
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
            path
            date
            lead
            tags_
            section_
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
