import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const SimpleLogoImage = ({ style }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo_simple.png" }) {
        childImageSharp {
          fluid(maxWidth: 40) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Link to="/home">
      < Img fluid={data.placeholderImage.childImageSharp.fluid} style={{ width: '40px', ...style }} />
    </Link>
  )
}

export default SimpleLogoImage