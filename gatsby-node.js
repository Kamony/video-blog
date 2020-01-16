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

//
// exports.sourceNodes = ({ boundActionCreators, getNodes, getNode }) => {
//   const { createNodeField } = boundActionCreators;
//
//   const postsOfAuthors = {};
//   // iterate thorugh all markdown nodes to link books to author
//   // and build author index
//   const markdownNodes = getNodes()
//     .filter(node => node.internal.type === "MarkdownRemark")
//     .forEach(node => {
//       if (node.frontmatter.section_) {
//         const sectionNode = getNodes().find(
//           node2 =>
//             node2.internal.type === "MarkdownRemark" &&
//             node2.frontmatter.section === node.frontmatter.section_
//         );
//
//         if (sectionNode) {
//           createNodeField({
//             node,
//             name: "section",
//             value: sectionNode.id,
//           });
//
//           // if it's first time for this author init empty array for his posts
//           if (!(sectionNode.id in postsOfAuthors)) {
//             postsOfAuthors[sectionNode.id] = [];
//           }
//           // add book to this section
//           postsOfAuthors[sectionNode.id].push(node.id);
//         }
//       }
//     });
//
//   Object.entries(postsOfAuthors).forEach(([sectionNodeId, postIds]) => {
//     createNodeField({
//       node: getNode(sectionNodeId),
//       name: "posts",
//       value: postIds,
//     });
//   });
// };
