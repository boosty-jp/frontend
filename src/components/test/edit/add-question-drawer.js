import React from 'react';
import { Drawer, Button, Icon } from 'antd';
import AddQuestionForm from 'components/test/edit/add-question-form'

class AddQuestionDrawer extends React.Component {
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
            <div>
                <Button type="primary" onClick={this.showDrawer} style={{ width: '100%' }}><Icon type="plus" style={{ marginRight: '8px' }} />追加する</Button>
                <Drawer
                    title={<p style={{ textAlign: 'center', marginBottom: '0px' }}>追加する問題を作成してください</p>}
                    height="90%"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    placement="top"
                >
                    <AddQuestionForm />
                    {/* <div style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}>
                        <Form>
                            <Form.Item
                                label={
                                    <span>タイトル&nbsp;
                               <Tooltip title="60文字まで入力できます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>}
                                validateStatus={props.error.title.status}
                                help={props.error.title.message}
                            >
                                <Input
                                    size="large"
                                    value={props.title}
                                    placeholder="タイトルを入力してください"
                                    onChange={(e) => props.updateTitle(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span>出題対象のコース&nbsp;
                        <Tooltip title="公開されているコースのみ指定できます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>}
                            >
                                <ReferenceCourseForm />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span>説明&nbsp;
                               <Tooltip title="200文字まで入力できます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>}
                                validateStatus={props.error.description.status}
                                help={props.error.description.message}
                            >
                                <Input.TextArea
                                    value={props.description}
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                    style={{ marginTop: '10px' }}
                                    placeholder="説明を入力してください"
                                    onChange={(e) => props.updateDescription(e.target.value)}
                                />
                            </Form.Item>
                        </Form>
                        <Button type="primary" onClick={this.showChildrenDrawer}>Two-level drawer</Button>
                    </div>
                    <Drawer
                        title="Two-level Drawer"
                        height="80%"
                        closable={false}
                        onClose={this.onChildrenDrawerClose}
                        visible={this.state.childrenDrawer}
                        placement="top"
                    >
                        This is two-level drawer
          </Drawer> */}
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
                        }}
                    >
                        <Button style={{ marginRight: 16 }} onClick={this.onClose}>キャンセル</Button>
                        <Button onClick={this.onClose} type="primary">追加する</Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default AddQuestionDrawer;