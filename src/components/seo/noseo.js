import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import OGP_IMAGE from 'images/ogp.png'

function NOSEO({ description, meta, title, url }) {
    const { site } = useStaticQuery(
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

    if (!title) return <></>

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
                    content: title,
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
                    content: title,
                },
                {
                    name: `twitter:site`,
                    content: `@boosty_officail`,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    property: `robots`,
                    content: `noindex`,
                },
            ].concat(meta)}
        />
    )
}

NOSEO.defaultProps = {
    meta: [],
    description: ``,
    title: `boosty`,
    url: `https://boosty.jp`
}

NOSEO.propTypes = {
    description: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

export default NOSEO