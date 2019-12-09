import React from "react"
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Button,
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
                            メールアドレス &nbsp;
                            <Tooltip title="ログイン時や通知に用いるメールアドレスです">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }>
                        {getFieldDecorator('mail', {
                            rules: [{ required: true, message: 'メールアドレスを入力してください', whitespace: true }],
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

const MailUpdateForm = Form.create({ name: 'mail-update' })(UpdateForm);
export default MailUpdateForm