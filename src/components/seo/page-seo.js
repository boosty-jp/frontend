import React from "react"
import { connect } from 'react-redux'
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { createBookOgpImageUrl, createPageViewLink, createPageViewUrl } from "utils/link-generator"
import removeMd from 'remove-markdown'

const PageSeoComponent = (props) => {
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

    let metaDescription = removeMd(props.description).substr(0, 120);
    if (!metaDescription) metaDescription = site.siteMetadata.description;

    let title = props.title;
    if (title) {
        title = `${title} | boosty`
    } else {
        title = site.siteMetadata.title;
    }

    let url = "";
    if (props.pageId) {
        url = createPageViewUrl(props.pageId, props.bookId);
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
            title={props.title}
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
    pageId: state.pageView.id,
    title: state.pageView.title,
    text: state.pageView.text,
    imageUrl: state.bookView.imageUrl,
})

const PageSEO = connect(mapStateToProps)(PageSeoComponent)
export default PageSEO