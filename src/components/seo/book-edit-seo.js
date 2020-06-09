import React from "react"
import { connect } from 'react-redux'
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { createBookDetailUrl, createBookOgpImageUrl } from "utils/link-generator"

const BookEditSeoComponent = (props) => {
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

    const metaDescription = props.description || site.siteMetadata.description

    return (
        <Helmet
            htmlAttributes={{
                lang: `ja`,
            }}
            title={props.title}
            titleTemplate={`「%s」の編集`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:url`,
                    content: createBookDetailUrl(props.bookId),
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
                    content: `summary`,
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