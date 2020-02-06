import React from "react"
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { Form, Input, Icon, Button, message } from 'antd';

const UPDATE_BOOK_FEATURES = gql`
mutation updateBookFeatures($bookId: ID!, $features: [String]!){
  updateBookFeatures(bookId: $bookId, features: $features)
}
`;

class BookEditFeaturesFormComponent extends React.Component {
    state = { loading: false }
    remove = k => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        // 1つ以上は必ず入力させる
        if (keys.length === 1) {
            return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat("");
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                if (!keys || keys.length === 0) {
                    message.error("特徴を入力してください。");
                    return;
                }
                this.updateFeatures(keys.map(key => names[key]));

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
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
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
        getFieldDecorator('keys', { initialValue: this.props.features });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '特徴' : ''}
                required={false}
                key={index}
            >
                {getFieldDecorator(`names[${index}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "入力してください",
                        },
                    ],
                    initialValue: k
                })(<Input placeholder="特徴を入力してください" style={{ width: '60%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
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

const BookEditFeaturesForm = Form.create({ name: 'FeatureItems' })(BookEditFeaturesFormComponent);
export default withApollo(BookEditFeaturesForm);