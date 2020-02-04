import React from "react"
import { Form, Input, Icon, Button, message, Slider } from 'antd';

let id = 1;
const levels = {
    0: '入門',
    33.3: '初級',
    66.6: '中級',
    100: '上級',
};

class BookEditTargetPointsComponent extends React.Component {
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
        const nextKeys = keys.concat(id++);
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
                }
                console.log('特徴', keys.map(key => names[key]));
            }
        });
    };

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
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '特徴' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "入力してください",
                        },
                    ],
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
                <Form.Item label="レベル" {...formItemLayout}>
                    {getFieldDecorator('level-slider')(
                        <div style={{ padding: '0px 20px' }}>
                            <Slider marks={levels} defaultValue={[0, 33.3]} step={null} tooltipVisible={false} range />
                        </div>
                    )}
                </Form.Item>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" />追加する
          </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">更新する</Button>
                </Form.Item>
            </Form>
        );
    }
}

const BookEditTargetPoints = Form.create({ name: 'FeatureItems' })(BookEditTargetPointsComponent);
export default BookEditTargetPoints;