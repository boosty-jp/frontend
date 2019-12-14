import React from "react"
import { connect } from 'react-redux'
import { Rate, Button, Modal, Tooltip, Typography, Tag, Divider } from 'antd';

const { Title } = Typography;
const rateDescription = ['初級', '中級', '上級'];

class ArticlePreviewComponent extends React.Component {
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
                    <Typography>
                        <Title>{this.props.title}</Title>
                    </Typography>
                    <div>
                        {this.props.tags.map(t => {
                            return (
                                <Tag key={t.id}>{t.label}</Tag>
                            )
                        })}
                    </div>
                    <div style={{ marginTop: '12px' }}>
                        {this.props.skills.map(s => {
                            return (
                                <div>
                                    <span style={{ fontWeight: '500', fontSize: '16px', marginRight: '16px' }}>{s.name}</span>
                                    <Rate
                                        count={3}
                                        disabled
                                        value={s.level}
                                        tooltips={rateDescription}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <Divider />
                    {this.props.text}
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    title: state.articleEdit.title,
    text: state.articleEdit.text,
    tags: state.articleEdit.tags,
    skills: state.articleEdit.skills,
})

const ArticlePreview = connect(mapStateToProps)(ArticlePreviewComponent)
export default ArticlePreview;