import React, { useState, useEffect, useRef } from "react"
import { Card, Progress } from 'antd';
import styled from 'styled-components'

const learnings = [
    { id: 1, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
    { id: 2, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
    { id: 3, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
    { id: 4, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
    { id: 5, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
    { id: 6, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
]
const TopicCard = styled(Card)`
  .ant-card-grid {
    padding: 16px;
  }
`;

const LearningAllCourses = () => {

    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    }, [])

    let gridStyle;
    if (width < 480) {
        gridStyle = { width: '100%' }
    } else if (width < 720) {
        gridStyle = { width: '50%' }
    } else if (width > 960) {
        gridStyle = { width: '25%' }
    }
    // 何もしなければデフォルトで3分割される

    return (
        <div ref={ref} style={{ marginBottom: '24px' }}>
            <TopicCard title="学習中のコース">
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

export default LearningAllCourses