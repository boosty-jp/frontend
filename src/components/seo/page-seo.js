import React from "react"
import { connect } from 'react-redux'
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { createBookOgpImageUrl, createPageViewLink } from "utils/link-generator"
import removeMd from 'remove-markdown'

const PageSeoComponent = (props) => {
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
      }
    `
    )

    let metaDescription = removeMd(props.description).substr(0, 120);
    if (!metaDescription) metaDescription = site.siteMetadata.description;

    return (
        <Helmet
            htmlAttributes={{
                lang: `ja`,
            }}
            title={props.title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:url`,
                    content: createPageViewLink(props.pageId, props.bookId),
                },
                {
                    property: `og:title`,
                    content: props.title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:image`,
                    content: createBookOgpImageUrl(props.imageUrl),
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
                    content: `summary_large_image`,
                },
                {
                    name: `twitter:title`,
                    content: props.title,
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