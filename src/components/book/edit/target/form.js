import React from "react"
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4'
import { withApollo } from 'react-apollo'
import { Form, Input, Icon, Button, message, Slider } from 'antd';
import { getErrorMessage } from "utils/error-handle";

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

class BookEditTargetUserFormComponent extends React.Component {
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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { targetDescriptions, names, levelSlider } = values;
                if (!targetDescriptions || targetDescriptions.length === 0) {
                    message.error("特徴を入力してください。");
                    return;
                }
                const targets = {
                    levelStart: levelSlider[0],
                    levelEnd: levelSlider[1],
                    targetsDescriptions: targetDescriptions.map(targetDescription => names[targetDescription.id])
                }

                this.updateTargetDescriptions(targets);

            }
        });
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
        getFieldDecorator('targetDescriptions', { initialValue: this.props.targetDescriptions });
        const targetDescriptions = getFieldValue('targetDescriptions');
        const formItems = targetDescriptions.map((t, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '説明' : ''}
                required={false}
                targetDescription={t.id}
            >
                {getFieldDecorator(`names[${t.id}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "入力してください",
                        },
                    ],
                    initialValue: t.value
                })(<Input placeholder="特徴を入力してください" style={{ width: '60%', marginRight: 8 }} />)}
                {targetDescriptions.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(t.id)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label="レベル" {...formItemLayout}>
                    <div style={{ padding: '0px 20px' }}>
                        {getFieldDecorator('levelSlider', { initialValue: [this.props.levelStart, this.props.levelEnd] })(
                            <Slider marks={levels} step={1} max={3} min={0} tooltipVisible={false} range />
                        )}
                    </div>
                </Form.Item>
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

const BookEditTargetUserForm = Form.create({ name: 'TargetUserForm' })(BookEditTargetUserFormComponent);
export default withApollo(BookEditTargetUserForm);