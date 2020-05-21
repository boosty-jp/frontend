import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const ScreenImage = ({ style }) => {
    const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "demo.png" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

    return (
        < Img fluid={data.placeholderImage.childImageSharp.fluid} style={{ ...style, width: '100%' }} />
    )
}

export default ScreenImage