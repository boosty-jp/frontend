import React, { useState, useEffect, useRef } from "react"
import { Card } from 'antd';
import { Link } from "gatsby";
import styled from 'styled-components'

const TopicCard = styled(Card)`
  .ant-card-grid {
    padding: 16px;
  }
`;

const categories = [
    { id: 1, title: 'React' },
    { id: 2, title: 'Javascript' },
    { id: 3, title: '開発環境' },
    { id: 4, title: 'Java' },
    { id: 5, title: '外国語' },
    { id: 6, title: 'スペイン語' },
    { id: 7, title: 'C++' },
    { id: 8, title: '応用情報技術者試験' },
]
const TopicCategoryList = () => {

    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let gridStyle;
    if (width < 480) {
        gridStyle = { width: '50%' }
    } else {
        gridStyle = { width: '25%' }
    }
    // 何もしなければデフォルトで3分割される

    return (
        <div ref={ref} style={{ marginBottom: '24px' }}>
            <TopicCard title="カテゴリー" extra={<Link to="/" >すべてを表示</Link>}>
                {categories.map((l) =>
                    <Card.Grid key={l.id} style={gridStyle}>
                        {l.title}
                    </Card.Grid>
                )}
            </TopicCard>
        </div>
    )
}

export default TopicCategoryList