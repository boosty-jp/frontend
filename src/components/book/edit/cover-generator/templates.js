import React from "react"
import { Tabs, Row, Col } from 'antd';
import simpleTemplates from "./simple-templates";
const { TabPane } = Tabs;

const categories = [
    { title: 'シンプル', key: 'simple', items: simpleTemplates },
    { title: '幾何学模様', key: 'geometric', items: [] },
    { title: '抽象的', key: 'abstract', items: [] },
]
const CoverTemplates = () => {
    return (
        <>
            <Tabs defaultActiveKey="simple">
                {categories.map(category => {
                    return (
                        <TabPane tab={category.title} key={category.key}>
                            <Row gutter={20}>
                                {
                                    category.items.map(item => {
                                        return (
                                            <Col xs={24} sm={24} md={8} lg={6} xl={6}>{item.image.example}</Col>
                                        )
                                    })
                                }
                            </Row>
                        </TabPane>
                    )
                })}
            </Tabs>
        </>
    )
}

export default CoverTemplates