import React from "react"
import { connect } from 'react-redux'
import { Affix, Progress, Button, Row, Col } from 'antd';

const CourseProgressComponent = (props) => {
    if (props.sections.length === 0) return <></>;

    let LearnButton = () => <></>;
    if (!props.learnStatus || !props.learnStatus.status) {
        LearnButton = () => <Button
            type="primary"
            shape="round"
            style={{
                boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
            }}
            icon='thunderbolt'
            ghost
        >始める</Button >
    } else if (props.learnStatus.status === 'learned') {
        return <></>;
    } else if (props.learnStatus.status === 'start') {
        LearnButton = () => <Button
            type="primary"
            shape="round"
            style={{
                boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
            }}
            icon='highlight'
            ghost
        >続きから</Button >
    }

    const learnedList = props.sections.map(section => {
        return { learned: section.articles.reduce((c, x) => c + (x.learned ? 1 : 0), 0), sum: section.articles.length }
    });
    const learnedSum = learnedList.reduce((l, x) => l + (x.learned ? 1 : 0), 0);
    const sumCount = learnedList.reduce((l, x) => l + (x.sum ? 1 : 0), 0);
    const progressVal = Math.floor(learnedSum * 100 / sumCount);

    return (
        <Affix offsetBottom={0} style={{ width: '100%' }}>
            <div style={{
                background: 'white', width: '100%',
                boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
            }}>
                <div style={{ padding: '20px', margin: '0 auto', textAlign: 'center', maxWidth: '740px', width: '100%' }}>
                    <Row type="flex" align="middle" justify="space-around">
                        <Col xs={12} sm={14} md={18} lg={18} xl={18} xxl={18}>
                            <Progress percent={progressVal} />
                        </Col>
                        <Col xs={12} sm={10} md={6} lg={6} xl={6} xxl={6}>
                            <LearnButton />
                        </Col>
                    </Row>
                </div>
            </div>
        </Affix>
    )
}

const mapStateToProps = state => ({
    sections: state.courseView.sections,
    learnStatus: state.courseView.learnStatus,
})

const CourseProgress = connect(mapStateToProps)(CourseProgressComponent)


export default CourseProgress