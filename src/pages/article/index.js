import React, { useState, useEffect, useRef } from "react"
import ArticleLayout from 'components/layout/vertical/article'
import ArticleContent from 'components/article/view'

const ArticleDetailPage = () => {
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
                    <ArticleContent />
                </div>
            </div>
        </ArticleLayout>
    );
}

export default ArticleDetailPage;