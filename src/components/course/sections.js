import React from 'react';
import { Collapse, Button, List, Typography } from 'antd';

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}

const sections = [
    {
        title: '基礎文法の理解',
        articles: [
            { title: 'for文を学ぶ', learned: false },
            { title: '型を学ぶ', learned: true },
            { title: 'Whileループを学ぶ', learned: false },
            { title: '関数の書き方を学ぶ', learned: true },
        ],
        learned: false
    },
    {
        title: 'オブジェクト指向',
        articles: [
            { title: 'オブジェクト指向とは', learned: false },
            { title: '型を学ぶ', learned: true },
            { title: 'Whileループを学ぶ', learned: false },
            { title: '関数の書き方を学ぶ', learned: false },
        ],
        learned: false
    },
]

const Sections = () => {
    return (
        <div style={{ padding: '24px', backgroundColor: 'white' }}>
            <p style={{ fontSize: '24px', fontWeight: '600' }}>コース内容</p>
            <Collapse onChange={callback}>
                {sections.map((s, sectionIdx) => {
                    return (
                        <Panel header={sectionIdx + 1 + ". " + s.title} key={sectionIdx} extra={<span>全{s.articles.length}回</span>}>
                            <List
                                itemLayout="horizontal"
                                dataSource={s.articles}
                                renderItem={(article, articleIdx) => (
                                    <List.Item
                                        actions={[article.learned ? <Button type="primary" style={{ width: '70px' }}>完了</Button> : <Button style={{ width: '70px' }}>未完了</Button>]}
                                    >
                                        <List.Item.Meta
                                            title={<><span style={{ marginRight: '12px' }}>{sectionIdx + 1}-{articleIdx + 1}.</span><a href="https://ant.design">{article.title}</a></>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Panel>
                    )
                })}
            </Collapse>
        </div>
    )
}

export default Sections