import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, meta, title, url }) {
  const { site, allFile } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        allFile(filter: {relativePath: {eq: "ogp.png"}}) {
          edges {
            node {
             publicURL
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang: `ja`,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:title`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: `https://boosty.jp${allFile.edges[0].node.publicURL}`,
        },
        {
          property: `og:type`,
          content: `article`,
        },
        {
          property: `og:image:alt`,
          content: `ロゴ画像`,
        },
        {
          property: `og:site_name`,
          content: `boosty`,
        },
        {
          property: `og:locale`,
          content: `ja_JP`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: site.siteMetadata.title,
        },
        {
          name: `twitter:site`,
          content: `@boosty_officail`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  meta: [],
  description: ``,
  title: `boosty`,
  url: `https://boosty.jp`
}

SEO.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default SEO
