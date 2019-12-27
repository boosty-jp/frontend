import React, { useState, useEffect, useRef } from "react"
import ArticleLayout from 'components/layout/vertical/article'
import ArticleContent from 'components/article/view'
import withLocation from "components/wrapper/location";

const ArticleDetailPage = ({ search }) => {
    const { id } = search
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
            </div>
        </ArticleLayout>
    );
}

export default withLocation(ArticleDetailPage)