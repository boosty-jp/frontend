import React from 'react';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { message, Modal, Button, Form, Input, Tooltip } from 'antd';
import { addSection } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';

const ADD_SECTION = gql`
mutation addSection($bookId: ID!, $title: String!) {
  addSection(bookId: $bookId, title: $title) {
    id
  }
}
`;

class AddSectionComponent extends React.Component {
    state = { visible: false, loading: false, };

    showModal = () => {
        if (this.props.sections.length >= 20) {
            message.error("作成できるセクションは20までです", 7)
            return;
        }
        this.setState({
            visible: true,
        });
    };

    addSection = async values => {
        console.log(values);
        this.setState({ loading: true });
        try {
            const { data } = await this.props.client.mutate({
                mutation: ADD_SECTION,
                variables: {
                    bookId: this.props.id,
                    title: values.sectionTitle
                }
            });

            this.props.addSection(data.addSection.id, values.sectionTitle)
            message.success("セクションを追加しました。", 7)
            this.setState({ visible: false, loading: false });
        } catch (err) {
            message.error(getErrorMessage(err), 7);
            this.setState({ loading: false });
        }
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
                <Button
                    ghost
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={this.showModal}
                    style={{ marginRight: '12px' }}
                >
                    セクションを追加する
                </Button>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onFinish={this.addSection} {...layout} style={{ marginTop: '30px' }}>
                        <Form.Item
                            name="sectionTitle"
                            label={<SectionLabel />}
                            rules={[
                                { required: true, message: 'セクション名を入力してください', whitespace: true },
                                { max: 40, message: 'セクション名は40文字までです', whitespace: true },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button
                                key="submit"
                                type="primary"
                                htmlType="submit"
                                loading={this.state.loading}
                            >
                                追加する
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    sections: state.bookEdit.sections,
})

const mapDispatchToProps = dispatch => ({
    addSection: (id, title) => dispatch(addSection(id, title)),
})

const AddSectionForm = connect(mapStateToProps, mapDispatchToProps)(AddSectionComponent);
export default withApollo(AddSectionForm)

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 7, span: 16 },
};

const SectionLabel = () => {
    return (
        <span>
            セクション名&nbsp;
            <Tooltip title="40文字まで入力できます">
                <QuestionCircleOutlined />
            </Tooltip>
        </span>

    )
}