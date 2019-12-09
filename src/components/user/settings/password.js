import React from "react"
import {
    Form,
    Input,
    Button,
    Tooltip,
    Icon,
} from 'antd';

class UpdateForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div style={{ maxWidth: '500px', width: '100%' }}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label={
                        <span>
                            新しいパスワード &nbsp;
                            <Tooltip title="6文字以上にしてください">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'パスワードを入力してください', whitespace: true },
                                { min: 6, message: '6文字以上を入力してください' },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">更新する</Button>
                    </Form.Item>
                </Form >
            </div>
        );
    }
}

const PasswordUpdateForm = Form.create({ name: 'mail-update' })(UpdateForm);
export default PasswordUpdateForm