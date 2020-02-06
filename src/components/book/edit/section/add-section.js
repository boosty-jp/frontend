import React from 'react';
import { Modal, Button, Form, Input, Tooltip, Icon } from 'antd';

class AddSectionComponent extends React.Component {
    state = { visible: false, loading: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Button
                    ghost
                    type="primary"
                    icon="plus"
                    style={{ marginRight: '12px' }}
                    onClick={this.showModal}
                >
                    セクションを追加する
                </Button>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>キャンセル</Button>,
                        <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleOk}>追加する</Button>,
                    ]}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            label={
                                <span>
                                    セクション名&nbsp;
                                            <Tooltip title="40文字まで入力できます">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                        >
                            {getFieldDecorator('displayName', {
                                rules: [
                                    { required: true, message: 'セクション名を入力してください', whitespace: true },
                                    { max: 40, message: 'セクション名は40文字までです', whitespace: true },
                                ],
                                initialValue: "",
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

const AddSectionForm = Form.create({ name: 'add-section' })(AddSectionComponent);
export default AddSectionForm