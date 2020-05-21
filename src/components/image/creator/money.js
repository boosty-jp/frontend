import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const MoneyFeatureImage = ({ style }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "feature1.png" }) {
        childImageSharp {
          fluid(maxWidth: 140) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    < Img fluid={data.placeholderImage.childImageSharp.fluid} style={{ height: '100px', ...style }} />
  )
}

export default MoneyFeatureImage