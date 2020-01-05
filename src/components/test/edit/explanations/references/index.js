import React from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Tooltip, Button, Drawer } from 'antd';
import ReferenceArticleSelector from 'components/test/edit/explanations/references/reference-article-selector'
import { clearArticle } from 'modules/test/edit/reference-article'
import ReferenceArticleBlockSelector from 'components/test/edit/explanations/references/reference-block-selector'
import ReferenceList from 'components/test/edit/explanations/references/reference-list'

class ReferenceForm extends React.Component {
    state = { drawerVisible: false };

    showDrawer = () => {
        this.props.clearArticle();
        this.setState({ drawerVisible: true });
    }

    render() {
        return (
            <>
                <Form.Item
                    label={
                        <span>参考情報&nbsp;
                            <Tooltip title="5つまで追加できます">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    <div style={{ marginTop: '12px' }}>
                        <ReferenceList />
                        <Button
                            type="dashed"
                            icon="plus"
                            disabled={this.props.references.length >= 5}
                            onClick={this.showDrawer}
                            style={{ width: '100%' }}
                        >追加する</Button>
                    </div>
                </Form.Item>
                <Drawer
                    height="90%"
                    placement="top"
                    closable={false}
                    onClose={() => this.setState({ drawerVisible: false })}
                    visible={this.state.drawerVisible}
                >
                    {this.props.referenceArticleId ?
                        <ReferenceArticleBlockSelector id={this.props.referenceArticleId} />
                        :
                        <ReferenceArticleSelector />
                    }
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'center',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                            zIndex: '2',
                        }}
                    >
                        {
                            this.props.referenceArticleId ?
                                <Button onClick={() => this.setState({ drawerVisible: false })} type="primary">完了</Button>
                                :
                                <Button onClick={() => this.setState({ drawerVisible: false })}>キャンセル</Button>
                        }
                    </div>
                </Drawer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    referenceArticleId: state.referenceArticle.id,
    references: state.testEditExplanation.references,
})

const mapDispatchToProps = dispatch => ({
    clearArticle: () => dispatch(clearArticle()),
})

const ReferenceSelectForm = connect(mapStateToProps, mapDispatchToProps)(ReferenceForm)

export default ReferenceSelectForm;