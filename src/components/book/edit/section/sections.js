import React from 'react';
import { Collapse, List, Icon, Row, Col, Typography } from 'antd'

const { Paragraph } = Typography;
const { Panel } = Collapse;

const sections = [
    {
        title: "xx",
        articles: [
        ]
    },
    {
        title: "コンピューティング",
        articles: [
            { id: "a-1", title: 'はじめに' },
            { id: "a-2", title: 'AWSのコンピューティング種別' },
            { id: "a-3", title: 'IaaSについて' },
            { id: "a-4", title: 'EC2' },
            { id: "a-5", title: 'ECS' },
            { id: "a-6", title: 'EKS' },
            { id: "a-7", title: 'PaaS' },
            { id: "a-8", title: 'Elastic Bean Stalk' },
            { id: "a-9", title: 'サーバーレスアーキテクチャ' },
            { id: "a-10", title: 'Lambda' },
        ]
    },
    {
        title: "ネットワーク",
        articles: [
            { id: "b-1", title: 'はじめに' },
            { id: "b-2", title: 'AWSのコンピューティング種別' },
            { id: "b-3", title: 'IaaSについて' },
            { id: "b-4", title: 'EC2' },
            { id: "b-5", title: 'ECS' },
            { id: "b-6", title: 'EKS' },
            { id: "b-7", title: 'PaaS' },
            { id: "b-8", title: 'Elastic Bean Stalk' },
            { id: "b-9", title: 'サーバーレスアーキテクチャ' },
            { id: "b-10", title: 'Lambda' },
        ]
    },
    {
        title: "ストレージ",
        articles: [
            { id: "c-1", title: 'はじめに' },
            { id: "c-2", title: 'AWSのコンピューティング種別' },
            { id: "c-3", title: 'IaaSについて' },
            { id: "c-4", title: 'EC2' },
            { id: "c-5", title: 'ECS' },
            { id: "c-6", title: 'EKS' },
            { id: "c-7", title: 'PaaS' },
            { id: "c-8", title: 'Elastic Bean Stalk' },
            { id: "c-9", title: 'サーバーレスアーキテクチャ' },
            { id: "c-10", title: 'Lambda' },
        ]
    },
    {
        title: "データベース",
        articles: [
            { id: "d-1", title: 'はじめに' },
            { id: "d-2", title: 'AWSのコンピューティング種別' },
            { id: "d-3", title: 'IaaSについて' },
            { id: "d-4", title: 'EC2' },
            { id: "d-5", title: 'ECS' },
            { id: "d-6", title: 'EKS' },
            { id: "d-7", title: 'PaaS' },
            { id: "d-8", title: 'Elastic Bean Stalk' },
            { id: "d-9", title: 'サーバーレスアーキテクチャ' },
            { id: "d-10", title: 'Lambda' },
        ]
    },
    {
        title: "分析基盤",
        articles: [
            { id: "e-1", title: 'はじめに' },
            { id: "e-2", title: 'AWSのコンピューティング種別' },
            { id: "e-3", title: 'IaaSについて' },
            { id: "e-4", title: 'EC2' },
            { id: "e-5", title: 'ECS' },
            { id: "e-6", title: 'EKS' },
            { id: "e-7", title: 'PaaS' },
            { id: "e-8", title: 'Elastic Bean Stalk' },
            { id: "e-9", title: 'サーバーレスアーキテクチャ' },
            { id: "e-10", title: 'Lambda' },
        ]
    },
    {
        title: "セキュリティ",
        articles: [
            { id: "f-1", title: 'はじめに' },
            { id: "f-2", title: 'AWSのコンピューティング種別' },
            { id: "f-3", title: 'IaaSについて' },
            { id: "f-4", title: 'EC2' },
            { id: "f-5", title: 'ECS' },
            { id: "f-6", title: 'EKS' },
            { id: "f-7", title: 'PaaS' },
            { id: "f-8", title: 'Elastic Bean Stalk' },
            { id: "f-9", title: 'サーバーレスアーキテクチャ' },
            { id: "f-10", title: 'Lambda' },
        ]
    },
    {
        title: "CI/CD",
        articles: [
            { id: "g-1", title: 'はじめに' },
            { id: "g-2", title: 'AWSのコンピューティング種別' },
            { id: "g-3", title: 'IaaSについて' },
            { id: "g-4", title: 'EC2' },
            { id: "g-5", title: 'ECS' },
            { id: "g-6", title: 'EKS' },
            { id: "g-7", title: 'PaaS' },
            { id: "g-8", title: 'Elastic Bean Stalk' },
            { id: "g-9", title: 'サーバーレスアーキテクチャ' },
            { id: "g-10", title: 'Lambda' },
        ]
    },
    {
        title: "コンテンツデリバリー",
        articles: [
            { id: "h-1", title: 'はじめに' },
            { id: "h-2", title: 'AWSのコンピューティング種別' },
            { id: "h-3", title: 'IaaSについて' },
            { id: "h-4", title: 'EC2' },
            { id: "h-5", title: 'ECS' },
            { id: "h-6", title: 'EKS' },
            { id: "h-7", title: 'PaaS' },
            { id: "h-8", title: 'Elastic Bean Stalk' },
            { id: "h-9", title: 'サーバーレスアーキテクチャ' },
            { id: "h-10", title: 'Lambda' },
        ]
    },
]

const BookEditSections = () => {
    if (sections.length > 0) {
        return (
            <Collapse defaultActiveKey={[...Array(sections.length).keys()]} >
                {sections.map((s, sectionIdx) => {
                    return (
                        <Panel
                            key={sectionIdx}
                            header={
                                < Row type="flex" align="middle">
                                    <Col xs={18} sm={18} md={20} lg={20} xl={20} xxl={20}>
                                        <Paragraph style={{ marginBottom: "0px", color: 'black' }}>{sectionIdx + 1 + ". " + s.title}</Paragraph>
                                    </Col>
                                    <Col xs={6} sm={6} md={4} lg={4} xl={4} xxl={4} style={{ textAlign: 'right' }}>
                                        <Icon type="edit" style={{ marginRight: '16px' }} />
                                        <Icon type="delete" />
                                    </Col>
                                </Row>
                            }
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={s.articles}
                                renderItem={(article, articleIdx) => {
                                    const paddingTop = articleIdx === 0 ? "0px" : "16px";
                                    const paddingBottom = articleIdx === s.articles.length - 1 ? "0px" : "16px";

                                    return (
                                        <List.Item
                                            actions={[
                                                <Icon type="eye" />
                                            ]}
                                            style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}
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
                                    )
                                }}
                            />
                        </Panel>
                    )
                })}
            </Collapse>
        );
    } else {
        return <></>
    }
}
export default BookEditSections