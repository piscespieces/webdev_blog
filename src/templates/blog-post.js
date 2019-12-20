import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulBlogPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.description}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.publishedDate}
            </p>
          </header>
          <div>
            {documentToReactComponents(post.richText.json)}
          </div>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <Bio
              author={post.reference.authorName}
              bio={post.reference.authorBio}
            // twitter={post.frontmatter.twitter}
            />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ($slug: String) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulBlogPost (slug: {eq: $slug}) {
      title
      description
      reference {
        authorName
        authorBio
        authorImage {
          resize {
            src
          }
        }
      }
      publishedDate(fromNow:true)
      image {
        resize (width: 750, height: 750) {
          src
        }
      }
      richText {
        json
      }
    }
  }
`
