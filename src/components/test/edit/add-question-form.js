import React from 'react';
import { Button, Form, Icon, Tooltip, Input, Drawer, Radio } from 'antd';
// import { updateTitle, updateType, updateReference} from 'modules/test/edit/question'
import SelectForm from 'components/test/edit/question/select'
import BooleanForm from 'components/test/edit/question/boolean'

class AddQuestionForm extends React.Component {
    state = { visible: false, childrenDrawer: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };

    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };

    render() {
        return (
            <div style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}>
                <Form>
                    <Form.Item
                        label={
                            <span>タイトル&nbsp;
                               <Tooltip title="60文字まで入力できます">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>}
                    // validateStatus={this.props.error.title.status}
                    // help={this.props.error.title.message}
                    >
                        <Input
                            size="large"
                            // value={this.props.title}
                            placeholder="タイトルを入力してください"
                        // onChange={(e) => this.props.updateTitle(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>回答形式</span>}
                    // validateStatus={this.props.error.title.status}
                    // help={this.props.error.title.message}
                    >
                        <Radio.Group defaultValue="select" buttonStyle="solid">
                            <Radio.Button value="boolean">○✗&nbsp;マルバツ</Radio.Button>
                            <Radio.Button value="select"><Icon type="unordered-list" style={{ marginRight: '8px' }} />選択</Radio.Button>
                            <Radio.Button value="text"><Icon type="highlight" style={{ marginRight: '8px' }} />記述</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>問題を解くための情報&nbsp;
                                        <Tooltip title="5ブロックまで追加できます">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        <span>
                            <Icon type="info-circle" theme="twoTone" twoToneColor="#69c0ff" style={{ marginRight: '8px' }} />
                            不正解の際に復習用データとして表示されます
                        </span>
                        {/* <ReferenceArticleForm /> */}
                    </Form.Item>

                    <Form.Item
                        label={
                            <span>問題文&nbsp;
                               <Tooltip title="2ブロックまで入力できます">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>}
                    // validateStatus={this.props.error.description.status}
                    // help={this.props.error.description.message}
                    >
                        <Input.TextArea
                            // value={this.props.description}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            style={{ marginTop: '10px' }}
                            placeholder="説明を入力してください"
                        // onChange={(e) => this.props.updateDescription(e.target.value)}
                        />
                    </Form.Item>


                    <BooleanForm />
                    {/* <SelectNumberForm /> */}
                    <SelectForm />
                </Form>
                <Button type="primary" onClick={this.showChildrenDrawer}>Two-level drawer</Button>
                <Drawer
                    title="Two-level Drawer"
                    height="90%"
                    closable={false}
                    onClose={this.onChildrenDrawerClose}
                    visible={this.state.childrenDrawer}
                    placement="top"
                >
                    This is two-level drawer
          </Drawer>
            </div>
        );
    }
}

export default AddQuestionForm;