import React from 'react';
import { connect } from 'react-redux'
import { Divider, Typography, Button, Modal, Tooltip, Tag, Collapse, List, Empty } from 'antd'
import SkillChart from 'components/course/editor/skill-chart';
import SkillBarChart from 'components/skill/bar-chart';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

class CoursePreviewComponent extends React.Component {
    state = {
        preview: false,
    };

    render() {
        return (
            <>
                <Tooltip placement="left" title="プレビュー">
                    <Button shape="circle" icon="eye" onClick={() => this.setState({ preview: true })} />
                </Tooltip>
                <Modal
                    title="プレビュー"
                    visible={this.state.preview}
                    onCancel={() => this.setState({ preview: false })}
                    footer={[<Button key="back" onClick={() => this.setState({ preview: false })}>閉じる</Button>]}
                    width={740}
                    style={{ top: 80 }}
                >
                    <img src={this.props.imageUrl} style={{ width: '100%' }} />
                    <Typography style={{ marginTop: '16px' }}>
                        <Title>{this.props.title}</Title>
                    </Typography>
                    <div>
                        {this.props.tags.map(t => {
                            return (
                                <Tag key={t.id}>{t.label}</Tag>
                            )
                        })}
                    </div>

                    <Typography style={{ marginTop: '16px' }}>
                        <Paragraph>{this.props.description}</Paragraph>
                    </Typography>
                    <div>
                        <SkillChart />
                        <SkillBarChart />
                    </div>
                    <Divider />
                    {this.props.sections.length === 0 ?
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="データがありません" />
                        :
                        <Collapse >
                            {this.props.sections.map((s, sectionIdx) => {
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
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    sections: state.courseEditSections.sections,
    title: state.courseEditBase.title,
    imageUrl: state.courseEditBase.imageUrl,
    tags: state.courseEditBase.tags,
    description: state.courseEditBase.description,
})

const CoursePreview = connect(mapStateToProps)(CoursePreviewComponent)
export default CoursePreview