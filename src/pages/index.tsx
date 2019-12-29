import * as React from "react"
import { graphql, Link } from "gatsby"
import { Grid, makeStyles } from "@material-ui/core"
import FeaturedPost from "../components/FeaturedPost"
import MainFeaturedPost from "../components/MainFeaturedPost"
import { About } from "../components/About"
import Sidebar from "../components/SideBar"
import { YouTube, Twitter, Facebook, Instagram } from "@material-ui/icons"
const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageTitle: "main image description",
  date: "13.12.2018",
  tags: ["free", "biology"],
}

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
  console.log(props)
  const classes = useStyles()

  return (
    <>
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={4}>
          <FeaturedPost post={mainFeaturedPost} />
          <FeaturedPost post={mainFeaturedPost} />
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
        {/*<ul>*/}
        {/*  {props.data.allMarkdownRemark.edges.map(edge => (*/}
        {/*    <li key={edge.node.id}>*/}
        {/*      <Link to={edge.node.frontmatter.path}>*/}
        {/*        {edge.node.frontmatter.title}*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
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
