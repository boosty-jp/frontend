import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const NotFoundImage = () => {
    const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "404.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

    return (
        < Img fluid={data.placeholderImage.childImageSharp.fluid} style={{ width: '100%' }} />
    )
}

export default NotFoundImage