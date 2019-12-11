import React from 'react';
import { Icon, Row, Col, Collapse, List, Button, Empty } from 'antd'
import Sections from '../sections';
import SectionForm from './section-form';
import SectionSortList from './section-sort-list';

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}

const sections = [
    {
        id: "s-1",
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
        id: "s-2",
        title: 'オブジェクト指向',
        articles: [
            { title: 'オブジェクト指向とは', learned: false },
            { title: '型を学ぶ', learned: true },
            { title: 'Whileループを学ぶ', learned: false },
            { title: '関数の書き方を学ぶ', learned: false },
        ],
        learned: false
    },
    {
        id: "s-3",
        title: 'デザインパターン',
        articles: [
            { title: 'オブジェクト指向とは', learned: false },
            { title: '型を学ぶ', learned: true },
            { title: 'Whileループを学ぶ', learned: false },
            { title: '関数の書き方を学ぶ', learned: false },
        ],
        learned: false
    },
]

export default class SectionsEditor extends React.Component {
    render() {
        return (
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <p style={{ fontSize: '24px', fontWeight: '600' }}>コース内容</p>
                    {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
                    <SectionSortList sections={sections} />
                    <SectionForm />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <p style={{ fontSize: '24px', fontWeight: '600' }}>プレビュー</p>
                    <Collapse onChange={callback}>
                        {sections.map((s, idx) => {
                            return (
                                <Panel header={idx + 1 + ". " + s.title} key={idx} extra={<span>全{s.articles.length}回</span>}>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={s.articles}
                                        renderItem={article => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={<a href="https://ant.design">{article.title}</a>}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Panel>
                            )
                        })}
                    </Collapse>
                </Col>
            </Row>
        );
    }
}