import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulBlogPost.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.title
          return (
            <article key={node.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.publishedDate}</small>
              </header>
              <section>
                <p>
                  {node.description}
                </p>
              </section>
              <p>{node.reference.authorName}</p>
              <div>
                <img src={node.image.resize.src}></img>
              </div>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allContentfulBlogPost (
      sort: {
        fields:publishedDate,
        order:DESC
      }
    ) {
      edges {
        node {
          title
          reference {
            authorName
            authorBio
            authorImage {
              file {
                url
              }
            }
          }
          slug
          publishedDate (fromNow:true)
          description
          image {
            resize (
              width: 250,
              height: 250
            ) {
              src
            }
          }
        }
      }
    }
  }
`

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//       edges {
//         node {
//           excerpt
//           fields {
//             slug
//           }
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             title
//             description
//             author
//             bio
//           }
//         }
//       }
//     }
//   }
// `
