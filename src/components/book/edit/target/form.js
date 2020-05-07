import React from "react"
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4'
import { withApollo } from 'react-apollo'
import { Form, Input, Button, message, Slider } from 'antd';
import { getErrorMessage } from "utils/error-handle";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const levels = {
    0: '入門',
    1: '初級',
    2: '中級',
    3: '上級',
};

const UPDATE_BOOK_TARGETS = gql`
mutation updateBookTargets($bookId: ID!, $targets: BookTargetsInput!){
  updateBookTargets(bookId: $bookId, targets: $targets)
}
`;

class BookEditTargetUserForm extends React.Component {
    state = { loading: false }
    remove = id => {
        const { form } = this.props;
        const targetDescriptions = form.getFieldValue('targetDescriptions');
        // 1つ以上は必ず入力させる
        if (targetDescriptions.length === 1) {
            return;
        }

        form.setFieldsValue({
            targetDescriptions: targetDescriptions.filter(targetDescription => targetDescription.id !== id),
        });
    };

    add = () => {
        const { form } = this.props;
        const targetDescriptions = form.getFieldValue('targetDescriptions');
        const nextKeys = targetDescriptions.concat({ id: uuidv4(), value: '' });
        form.setFieldsValue({
            targetDescriptions: nextKeys,
        });
    };

    handleSubmit = values => {
        const { targetDescriptions, levelSlider } = values;
        if (!targetDescriptions || targetDescriptions.length === 0) {
            message.error("説明を入力してください。");
            return;
        }
        const targets = {
            levelStart: levelSlider[0],
            levelEnd: levelSlider[1],
            targetsDescriptions: targetDescriptions
        }

        this.updateTargetDescriptions(targets);
    };

    updateTargetDescriptions = async (targets) => {
        this.setState({ loading: true })
        try {
            await this.props.client.mutate({
                mutation: UPDATE_BOOK_TARGETS,
                variables: {
                    bookId: this.props.id,
                    targets: targets
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
            <Form
                onFinish={this.handleSubmit}
                {...formItemLayoutWithOutLabel}
                initialValues={{ levelSlider: [this.props.levelStart, this.props.levelEnd], targetDescriptions: this.props.targetDescriptions }}
            >
                <Form.Item label="レベル" {...formItemLayout} name="levelSlider">
                    <Slider marks={levels} step={1} max={3} min={0} tooltipVisible={false} range />
                </Form.Item>
                <Form.List name="targetDescriptions">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? '説明' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[{ required: true, whitespace: true, message: "入力してください", }]}
                                            noStyle
                                        >
                                            <Input placeholder="説明を入力してください" style={{ width: '60%', marginRight: 8 }} />
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
                                        <PlusOutlined /> 説明を追加する
                                    </Button>
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

export default withApollo(BookEditTargetUserForm);