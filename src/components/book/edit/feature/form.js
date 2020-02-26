import React from "react"
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4'
import { withApollo } from 'react-apollo'
import { Form, Input, Icon, Button, message } from 'antd';
import { getErrorMessage } from 'utils/error-handle';

const UPDATE_BOOK_FEATURES = gql`
mutation updateBookFeatures($bookId: ID!, $features: [String]!){
  updateBookFeatures(bookId: $bookId, features: $features)
}
`;

class BookEditFeaturesFormComponent extends React.Component {
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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { features, names } = values;
                if (!features || features.length === 0) {
                    message.error("特徴を入力してください。");
                    return;
                }
                this.updateFeatures(features.map(feature => names[feature.id]));

            }
        });
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
        const { getFieldDecorator, getFieldValue } = this.props.form;
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
        getFieldDecorator('features', { initialValue: this.props.features });
        const features = getFieldValue('features');
        const formItems = features.map((f, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '特徴' : ''}
                required={false}
                feature={f.id}
            >
                {getFieldDecorator(`names[${f.id}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "入力してください",
                        },
                    ],
                    initialValue: f.value
                })(<Input placeholder="特徴を入力してください" style={{ width: '60%', marginRight: 8 }} />)}
                {features.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(f.id)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" />追加する
          </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>更新する</Button>
                </Form.Item>
            </Form>
        );
    }
}

const BookEditFeaturesForm = Form.create({ name: 'FeaturesForm' })(BookEditFeaturesFormComponent);
export default withApollo(BookEditFeaturesForm);