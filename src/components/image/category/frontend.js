import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const FrontendCategoryImage = ({ style }) => {
    const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "category1.png" }) {
        childImageSharp {
          fluid(maxWidth: 140) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

    return (
        <Link to="/">
            < Img fluid={data.placeholderImage.childImageSharp.fluid} style={{ width: '120px', ...style }} />
        </Link>
    )
}

export default FrontendCategoryImage