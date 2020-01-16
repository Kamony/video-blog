const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/BlogTemplate.tsx`)
  const result = await graphql(`
    query PagesQuery {
          allFile(filter: { sourceInstanceName: { eq: "markdown-pages" } }) {
              edges {
                  node {
                      dir
                      childMarkdownRemark {
                          frontmatter {
                              section_
                          }
                          fields {
                            slug
                          }
                      }
                  }
              }
          }
      }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allFile.edges.forEach(({ node }) => {
      createPage({
        path: node.childMarkdownRemark.fields.slug,
        component: blogPostTemplate,
        context: {slug: node.childMarkdownRemark.fields.slug},
      })
  })
  // sections
  const sectionTemplate = path.resolve(`src/templates/SectionTemplate.tsx`)
  const sectionResult = await graphql(`
      query SectionQuery {
          allFile(filter: { sourceInstanceName: { eq: "markdown-sections" } }) {
              edges {
                  node {
                      dir
                      childMarkdownRemark {
                          frontmatter {
                              section
                          }
                          fields {
                            slug
                          }
                      }
                  }
              }
          }
      }
  `)
  // Handle errors
  if (sectionResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  sectionResult.data.allFile.edges.forEach(({ node }) => {
      createPage({
        path: node.childMarkdownRemark.fields.slug,
        component: sectionTemplate,
        context: { section: node.childMarkdownRemark.frontmatter.section},
      })
  })
}
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const fileName = createFilePath({ node, getNode, basePath: `pages` })
    let slug = fileName.toLowerCase()
    if (fileNode.dir.includes('/model/blog')) {
      slug = `${node.frontmatter['section,']}${fileName}`.toLowerCase()
    }
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
