import React from "react"
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Button,
    Row,
    Col,
} from 'antd';
import AvatarUploader from "./avatar-uploader";

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
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item >
                                {getFieldDecorator('avatar', {
                                })(<AvatarUploader />)}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                                label={
                                    <span>
                                        表示名&nbsp;
                            <Tooltip title="weverのサービスを通じて、ユーザー名として表示されます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                            >
                                {getFieldDecorator('displayName', {
                                    rules: [{ required: true, message: '表示名を入力してください', whitespace: true }],
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={
                        <span>
                            自己紹介&nbsp;
                            <Tooltip title="ユーザープロフィールに表示されます">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }>
                        {getFieldDecorator('profile', {
                            // rules: [{ required: true, message: 'Please input website!' }],
                        })(
                            <Input.TextArea
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label={
                        <span>
                            WebサイトURL&nbsp;
                            <Tooltip title="ユーザープロフィールにサイトへのリンクが表示されます">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }>
                        {getFieldDecorator('website', {
                            // rules: [{ required: true, message: 'Please input website!' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label={
                        <span>
                            Twitter ID&nbsp;
                            <Tooltip title="ユーザープロフィールにTwitterへのリンクが表示されます">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }>
                        {getFieldDecorator('twitter', {
                            // rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label={
                        <span>
                            Facebook ID&nbsp;
                            <Tooltip title="ユーザープロフィールにFacebookへのリンクが表示されます">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }>
                        {getFieldDecorator('facebook', {
                            // rules: [{ required: true, message: 'Please input your phone number!' }],
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

const ProfileBaseUpdateForm = Form.create({ name: 'update' })(UpdateForm);
export default ProfileBaseUpdateForm