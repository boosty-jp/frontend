import React from "react"
import { connect } from 'react-redux'
import { Tabs, Card } from 'antd';
import CourseSections from "components/course/view/sections";
import Questions from "components/course/view/questions";

const tabList = [
    {
        key: 'content',
        tab: '内容',
    },
    {
        key: 'question',
        tab: '問題',
    },
    {
        key: 'summary',
        tab: 'サマリ',
    },
];

const contentList = {
    content: <CourseSections />,
    question: <Questions />,
    summary: <p>content3</p>,
};

class CourseDetailTabs extends React.Component {
    state = {
        key: 'content',
    };

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    render() {
        return (
            <Card
                style={{ width: '100%' }}
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                <div style={{ marginTop: '20px' }}>
                    {contentList[this.state.key]}
                </div>
            </Card>
        )
    }
}


export default CourseDetailTabs;