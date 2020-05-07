import React from "react"
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4'
import { withApollo } from 'react-apollo'
import { Form, Input, Button, message } from 'antd';
import { getErrorMessage } from 'utils/error-handle';
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const UPDATE_BOOK_FEATURES = gql`
mutation updateBookFeatures($bookId: ID!, $features: [String]!){
  updateBookFeatures(bookId: $bookId, features: $features)
}
`;

class BookEditFeaturesForm extends React.Component {
    state = { loading: false }
    remove = id => {
        const { form } = this.props;
        const features = form.getFieldValue('features');
        // 1つ以上は必ず入力させる
        if (features.length === 1) {
            return;
        }

        form.setFieldsValue({
            features: features.filter(feature => feature.id !== id),
        });
    };

    add = () => {
        const { form } = this.props;
        const features = form.getFieldValue('features');
        const nextKeys = features.concat({ id: uuidv4(), value: '' });
        form.setFieldsValue({
            features: nextKeys,
        });
    };

    handleSubmit = values => {
        const { features } = values;
        if (!features || features.length === 0) {
            message.error("特徴を入力してください。");
            return;
        }
        this.updateFeatures(features);
    };

    updateFeatures = async (features) => {
        this.setState({ loading: true })
        try {
            await this.props.client.mutate({
                mutation: UPDATE_BOOK_FEATURES,
                variables: {
                    bookId: this.props.id,
                    features: features
                }
            });
            message.success("更新しました", 7)
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }

        this.setState({ loading: false })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };

        return (
            <Form name="dynamic_form_item" onFinish={this.handleSubmit} initialValues={{ features: this.props.features }} {...formItemLayoutWithOutLabel}>
                <Form.List name="features">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? '特徴' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[{ required: true, whitespace: true, message: "入力してください", }]}
                                            noStyle
                                        >
                                            <Input placeholder="特徴を入力してください" style={{ width: '60%', marginRight: 8 }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => { add(); }} style={{ width: '60%' }}>
                                        <PlusOutlined /> 追加する</Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>更新する</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default withApollo(BookEditFeaturesForm);