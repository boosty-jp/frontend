import React from 'react';
import { Collapse, List, Icon } from 'antd'

const { Panel } = Collapse;

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const sections = [
    {
        title: "コンピューティング",
        articles: [
            { id: "a-1", title: 'はじめに' },
            { id: "a-2", title: 'AWSのコンピューティング種別' },
            { id: "a-2", title: 'IaaSについて' },
            { id: "a-2", title: 'EC2' },
            { id: "a-2", title: 'ECS' },
            { id: "a-2", title: 'EKS' },
            { id: "a-3", title: 'PaaS' },
            { id: "a-2", title: 'Elastic Bean Stalk' },
            { id: "a-3", title: 'サーバーレスアーキテクチャ' },
            { id: "a-4", title: 'Lambda' },
        ]
    },
    {
        title: "ネットワーク",
        articles: [
            { id: "a-1", title: 'はじめに' },
        ]
    },
    {
        title: "ストレージ",
        articles: [
            { id: "a-4", title: 'Lambda' },
        ]
    },
    {
        title: "データベース",
        articles: [
            { id: "a-4", title: 'Lambda' },
        ]
    },
    {
        title: "分析基盤",
        articles: [
            { id: "a-4", title: 'Lambda' },
        ]
    },
    {
        title: "セキュリティ",
        articles: [
            { id: "a-4", title: 'Lambda' },
        ]
    },
    {
        title: "CI/CD",
        articles: [
            { id: "a-4", title: 'Lambda' },
        ]
    },
    {
        title: "コンテンツデリバリー",
        articles: [
            { id: "a-4", title: 'Lambda' },
        ]
    },
    {
        title: "プロビジョニング",
        articles: [
            { id: "a-4", title: 'Lambda' },
        ]
    },
]
const BookSections = () => {
    return (
        <div style={{ marginTop: '20px', ...cardStyle }}>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '40px' }}>
                目次
            </p>
            {sections.length > 0 &&
                <Collapse defaultActiveKey={[...Array(sections.length).keys()]} >
                    {sections.map((s, sectionIdx) => {
                        return (
                            <Panel
                                key={s.title + sectionIdx}
                                header={
                                    <span style={{ fontWeight: '500', fontSize: '16px' }}>{sectionIdx + 1 + ". " + s.title}</span>
                                }
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={s.articles}
                                    renderItem={(article, articleIdx) => (
                                        <List.Item
                                            actions={[
                                                <Icon type="eye" />
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={
                                                    <>
                                                        <span style={{ marginRight: '12px' }}>{sectionIdx + 1}-{articleIdx + 1}. </span>
                                                        {article.title}
                                                    </>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                        )
                    })}
                </Collapse>
            }
        </div>
    );
}
export default BookSections