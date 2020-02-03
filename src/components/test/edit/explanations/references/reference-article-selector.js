import React from 'react';
import { connect } from 'react-redux'
import { Collapse, List, Button } from 'antd'
import styled from 'styled-components'
import { setArticleId } from 'modules/test/edit/reference-article'

const { Panel } = Collapse;

const CustomPanel = styled(Panel)`
  .ant-collapse-article-box {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
`;


const ReferenceArticle = (props) => {
    return (
        <div style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}>
            <p style={{ fontWeight: '500', fontSize: '16px' }}>記事を選んでください。</p>
            {props.sections.length > 0 &&
                <Collapse defaultActiveKey={[...Array(props.sections.length).keys()]} >
                    {props.sections.map((s, sectionIdx) => {
                        return (
                            <CustomPanel
                                key={sectionIdx}
                                header={<span style={{ fontWeight: '500', fontSize: '16px' }}>{sectionIdx + 1 + ". " + s.title}</span>}
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={s.articles}
                                    renderItem={(article, articleIdx) => (
                                        <List.Item
                                            actions={[
                                                <Button type="primary" onClick={() => props.setArticleId(article.id)}>選ぶ</Button>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={
                                                    <>
                                                        <span style={{ marginRight: '12px' }}>{sectionIdx + 1}-{articleIdx + 1}. </span>
                                                        <span>{article.title}</span>
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
        </div>
    );
}

const mapStateToProps = state => ({
    sections: state.testEditBase.referenceCourse.sections,
})

const mapDispatchToProps = dispatch => ({
    setArticleId: (id) => dispatch(setArticleId(id)),
})

const ReferenceArticleSelector = connect(mapStateToProps, mapDispatchToProps)(ReferenceArticle)

export default ReferenceArticleSelector