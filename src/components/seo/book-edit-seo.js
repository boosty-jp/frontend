import React from "react"
import { connect } from 'react-redux'
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { createBookEditUrl, createBookOgpImageUrl } from "utils/link-generator"

const BookEditSeoComponent = (props) => {
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

    const metaDescription = props.description || site.siteMetadata.description
    let title = props.title;
    if (title) {
        title = `「${title}」の編集`
    } else {
        title = site.siteMetadata.title;
    }

    let url = "";
    if (props.bookId) {
        url = createBookEditUrl(props.bookId);
    } else {
        url = typeof window !== 'undefined' ? window.location.href : 'https://boosty.jp'
    }

    let imageUrl = "";
    if (props.imageUrl) {
        imageUrl = createBookOgpImageUrl(props.imageUrl)
    } else {
        imageUrl = `https://boosty.jp${allFile.edges[0].node.publicURL}`;
    }

    return (
        <Helmet
            htmlAttributes={{
                lang: `ja`,
            }}
            title={title}
            titleTemplate={`%s`}
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
                    content: imageUrl,
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
                    content: `Boosty`,
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
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    property: `robots`,
                    content: `noindex`,
                },
            ].concat([])}
        />
    )
}

const mapStateToProps = state => ({
    bookId: state.bookEdit.id,
    title: state.bookEdit.title,
})

const BookEditSEO = connect(mapStateToProps)(BookEditSeoComponent)
export default BookEditSEO