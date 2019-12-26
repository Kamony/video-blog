import * as React from "react"
import { graphql, Link } from "gatsby"
import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"
import FeaturedPost from "../components/FeaturedPost"
import MainFeaturedPost from "../components/MainFeaturedPost"
import Header from "../components/Header"
import Footer from "../components/Footer"
// import GitHubIcon from "@material-ui/icons/GitHub"
// import FacebookIcon from "@material-ui/icons/Facebook"
// import TwitterIcon from "@material-ui/icons/Twitter"

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const sections = [
  { title: "Technology", url: "test" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
]

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageTitle: "main image description",
  date: "13.12.2018",
}

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageTitle: "Image Title",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageTitle: "Image Title",
  },
]

// const posts = [post1, post2, post3]

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    // { name: "GitHub", icon: GitHubIcon },
    // { name: "Twitter", icon: TwitterIcon },
    // { name: "Facebook", icon: FacebookIcon },
  ],
}

export default props => {
  console.log(props)

  return (
    <>
      <Header title="Video Learning Platform" sections={sections} />
      <Container maxWidth="lg">
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
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/^((?!/tags/).)*$/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`
