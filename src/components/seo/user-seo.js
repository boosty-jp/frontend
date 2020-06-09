import React from "react"
import { connect } from 'react-redux'
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import OGP_IMAGE from 'images/ogp.png'

const UserSeoComponent = (props) => {
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
            title={props.displayName}
            titleTemplate={`%sのプロフィール`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:url`,
                    content: 'https://boosty.jp/account/' + props.id,
                },
                {
                    property: `og:title`,
                    content: props.displayName + 'のプロフィール',
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:image`,
                    content: OGP_IMAGE,
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
                    content: props.displayName + 'のプロフィール',
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
    id: state.user.id,
    displayName: state.user.displayName,
    description: state.user.description,
    imageUrl: state.user.imageUrl,
})

const UserSEO = connect(mapStateToProps)(UserSeoComponent)
export default UserSEO