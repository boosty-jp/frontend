import React, { useState, useEffect, useRef } from "react"
import { connect } from 'react-redux'
import ArticleLayout from 'components/layout/vertical/article'
import ArticleContent from 'components/article/view'
import withLocation from "components/wrapper/location";
import ContentProfileCard from 'components/user/content-profile-card'

const ArticleDetailPageComponent = (props) => {
    const { id } = props.search
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let marginToMenu = '0px';
    if (width > 740) {
        marginToMenu = '30px'
    }

    return (
        <ArticleLayout>
            <div ref={ref}>
                <div style={{ background: '#fff', maxWidth: '740px', width: '100%', margin: marginToMenu + ' auto' }}>
                    <ArticleContent id={id} />
                </div>
                <div style={{ background: '#fff', maxWidth: '740px', width: '100%', margin: "20px auto", padding: '20px' }}>
                    <ContentProfileCard data={props.author} />
                </div>
            </div>
        </ArticleLayout>
    );
}

const mapStateToProps = state => ({
    author: state.articleView.author,
})

const ArticleDetailPage = connect(mapStateToProps)(ArticleDetailPageComponent)
export default withLocation(ArticleDetailPage)