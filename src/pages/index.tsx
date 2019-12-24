import * as React from "react"
import { graphql, Link } from "gatsby"

export default props => {
  console.log(props)

  return (
    <>
      <div>Hello world!</div>
      <ul>
        {props.data.allMarkdownRemark.edges.map(edge => (
          <li key={edge.node.id}>
            <Link to={edge.node.frontmatter.path}>
              {edge.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
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
          }
        }
      }
    }
  }
`
