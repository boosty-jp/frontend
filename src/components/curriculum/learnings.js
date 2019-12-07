import React, { useState, useEffect, useRef } from "react"
import { Card, Progress } from 'antd';
import { Link } from "gatsby";
import styled from 'styled-components'

const TopicCard = styled(Card)`
  .ant-card-grid {
    padding: 16px;
  }
`;

const LearningCurriculums = ({ learnings }) => {

    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let gridStyle;
    if (width < 480) {
        gridStyle = { width: '100%' }
    } else if (width < 720) {
        gridStyle = { width: '50%' }
    }
    // 何もしなければデフォルトで3分割される

    return (
        <div ref={ref} style={{ marginBottom: '24px' }}>
            <TopicCard title="学習中のカリキュラム" extra={<Link to="/" >すべてを表示</Link>}>
                {learnings.map((l) =>
                    <Card.Grid key={l.id} style={gridStyle}>
                        <img alt={l.title} src={l.image} style={{ width: '100%' }} />
                        <div className="ant-card-meta-title" style={{ marginTop: '4px' }}>{l.title}</div>
                        <div className="ant-card-meta-description">
                            <p style={{ marginBottom: '0.5em' }}>{l.LastLearnedDate}</p>
                            <Progress percent={l.progress} />
                        </div>
                    </Card.Grid>
                )}
            </TopicCard>
        </div>
    )
}

export default LearningCurriculums