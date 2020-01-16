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
                              path
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
        path: `${node.childMarkdownRemark.frontmatter.section_}${node.childMarkdownRemark.frontmatter.path}`.toLowerCase(),
        component: blogPostTemplate,
        context: {slug: node.childMarkdownRemark.frontmatter.path},
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
        path: node.childMarkdownRemark.frontmatter.slug,
        component: sectionTemplate,
        context: { section: node.childMarkdownRemark.frontmatter.section},
      })
  })
}
