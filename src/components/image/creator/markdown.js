import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const MarkdownFeatureImage = ({ style }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "feature2.png" }) {
        childImageSharp {
          fluid(maxWidth: 140) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    < Img fluid={data.placeholderImage.childImageSharp.fluid} style={{ width: '60px', ...style }} />
  )
}

export default MarkdownFeatureImage