import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, Collapse, List, Empty } from 'antd'
import SectionForm from 'components/course/editor/add-section-form';
import SectionSortList from 'components/course/editor/section-sort-list';

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}

const EditForm = ({ sections }) => {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>コース内容</p>
                {sections.length === 0 ?
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="セクションを追加してください" />
                    :
                    <SectionSortList sections={sections} />
                }
                <SectionForm />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>プレビュー</p>
                {sections.length === 0 ?
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="データがありません" />
                    :
                    <Collapse onChange={callback}>
                        {sections.map((s, sectionIdx) => {
                            return (
                                <Panel
                                    key={sectionIdx}
                                    header={sectionIdx + 1 + ". " + s.title}
                                    extra={<span>全{s.articles.length}回</span>}
                                >
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={s.articles}
                                        renderItem={(article, articleIdx) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={<><span style={{ marginRight: '12px' }}>{sectionIdx + 1}-{articleIdx + 1}. </span><a href="https://ant.design">{article.title}</a></>}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Panel>
                            )
                        })}
                    </Collapse>
                }
            </Col>
        </Row>
    );
}

const mapStateToProps = state => ({
    sections: state.courseEditSections.sections,
})

const CourseEditSectionsForm = connect(mapStateToProps)(EditForm)
export default CourseEditSectionsForm