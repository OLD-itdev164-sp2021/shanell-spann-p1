import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-plugin-image"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "Do MMMM, YYYY")
      featuredImage {
        fluid(maxWidth: 750) {
          ...GatsbyContentfulFluid
        }
      }
      body {
        raw
      }
    }
  }
`

const BlogPost = props => {
    const options = {
        renderNode: {
          "embedded-asset-block": node => {
            const alt = node.data.target.fields.title["en-US"]
            const url = node.data.target.fields.file["en-US"].url
            return <img alt={alt} src={url} />
          },
        },
      }

    return (
      <Layout>
        <SEO title={props.data.contentfulBlogPost.title} />
        <Link to="/blog/">Visit the Blog Page</Link>
        <div className="content">
          ...
          {props.data.contentfulBlogPost.featuredImage && (
            <Img
              className="featured"
              fluid={props.data.contentfulBlogPost.featuredImage.fluid}
              alt={props.data.contentfulBlogPost.title}
            />
          )}
  
          {documentToReactComponents(props.data.contentfulBlogPost.body.raw, options)}
        </div>
      </Layout>
    )
  }

export default BlogPost