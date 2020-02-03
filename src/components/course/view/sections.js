import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, Collapse, List, Button, Icon, Progress } from 'antd'
import { Link } from 'gatsby';
import { createArticleLink } from 'utils/link-generator';
import styled from 'styled-components'

const { Panel } = Collapse;

const CustomPanel = styled(Panel)`
  .ant-collapse-article-box {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
`;


const Sections = (props) => {
    return (
        <>
            {props.sections.length > 0 &&
                <Collapse defaultActiveKey={[...Array(props.sections.length).keys()]} >
                    {props.sections.map((s, sectionIdx) => {
                        return (
                            <CustomPanel
                                key={sectionIdx}
                                header={
                                    <Row>
                                        <Col xs={16} sm={16} md={18} lg={20} xl={20} xxl={20}>
                                            <span style={{ fontWeight: '500', fontSize: '16px' }}>{sectionIdx + 1 + ". " + s.title}</span>
                                        </Col>
                                        <Col xs={8} sm={8} md={6} lg={4} xl={4} xxl={4}>
                                            <div style={{ width: 80, margin: '0 0 0 auto' }}>
                                                <Progress
                                                    size="small"
                                                    percent={s.articles.reduce((c, x) => c + (x.learned ? 1 : 0), 0) * 100 / s.articles.length}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                }
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={s.articles}
                                    renderItem={(article, articleIdx) => (
                                        <List.Item
                                            actions={[
                                                <a href={createArticleLink(article.id)} target="_blank">
                                                    <Icon type="export" />
                                                </a>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={
                                                    <>
                                                        <Button
                                                            size="small"
                                                            shape="circle"
                                                            // onClick={this.learn}
                                                            // loading={this.state.loading}
                                                            icon={article.learned ? 'check' : ''}
                                                            style={{ color: article.learned ? 'green' : 'grey', marginRight: '16px' }}
                                                        />
                                                        <span style={{ marginRight: '12px' }}>{sectionIdx + 1}-{articleIdx + 1}. </span>
                                                        <Link to={createArticleLink(article.id)}>{article.title}</Link>
                                                    </>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </CustomPanel>
                        )
                    })}
                </Collapse>
            }
        </>
    );
}

const mapStateToProps = state => ({
    sections: state.courseView.sections,
})

const CourseSections = connect(mapStateToProps)(Sections)

export default CourseSections