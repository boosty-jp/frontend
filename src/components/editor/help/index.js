import React from 'react'
import { Tabs } from 'antd';
import HeadingHelp from './heading';
import EmphasisHelp from './emphasis';
import ContentHelp from './content';
import OtherHelp from './other'

const { TabPane } = Tabs;

const MarkdownHelp = () => {
    return (
        <Tabs >
            <TabPane tab="見出し" key="1" >
                <HeadingHelp />
            </TabPane>
            <TabPane tab="強調" key="2" >
                <EmphasisHelp />
            </TabPane>
            <TabPane tab="コンテンツ" key="3">
                <ContentHelp />
            </TabPane>
            <TabPane tab="その他" key="4">
                <OtherHelp />
            </TabPane>
        </Tabs>
    )
}

export default MarkdownHelp