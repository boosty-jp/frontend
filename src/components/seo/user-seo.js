import React from "react"
import { connect } from 'react-redux'
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const UserSeoComponent = (props) => {
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
    let title = props.displayName + "のプロフィール";
    if (!props.displayName) {
        title = "プロフィール"
    }

    let url = 'https://boosty.jp/user/?id=' + props.id;
    if (!props.id) {
        url = typeof window !== 'undefined' ? window.location.href : 'https://boosty.jp';
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