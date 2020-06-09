import React from "react"
import { connect } from 'react-redux'
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { createBookDetailUrl, createBookOgpImageUrl } from "utils/link-generator"

const BookSeoComponent = (props) => {

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

    const metaDescription = props.description.substr(0, 120) || site.siteMetadata.description
    let title = props.title;
    if (title) {
        title = `${title} | boosty`
    } else {
        title = site.siteMetadata.title;
    }

    let url = "";
    if (props.bookId) {
        url = createBookDetailUrl(props.bookId);
    } else {
        url = typeof window !== 'undefined' ? window.location.href : 'https://boosty.jp'
    }

    let imageUrl = "";
    if (props.imageUrl) {
        imageUrl = createBookOgpImageUrl(props.imageUrl)
    } else {
        imageUrl = `https://boosty.jp${allFile.edges[0].node.publicURL}`;
    }

    let cardType = "summary_large_image";
    if (!props.imageUrl) cardType = "summary";

    return (
        <Helmet
            htmlAttributes={{
                lang: `ja`,
            }}
            title={title}
            titleTemplate={`%s`}
            meta={[
                {
                    name: `title`,
                    content: title,
                },
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
                    content: cardType,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:site`,
                    content: `@boosty_official`,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat([])}
        />
    )
}

const mapStateToProps = state => ({
    bookId: state.bookView.id,
    title: state.bookView.title,
    description: state.bookView.description,
    imageUrl: state.bookView.imageUrl,
})

const BookSEO = connect(mapStateToProps)(BookSeoComponent)
export default BookSEO