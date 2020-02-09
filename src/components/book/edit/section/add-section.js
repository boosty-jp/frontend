import React from 'react';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { message, Modal, Button, Form, Input, Tooltip, Icon } from 'antd';
import { addSection } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";

const ADD_SECTION = gql`
mutation addSection($bookId: ID!, $title: String!) {
  addSection(bookId: $bookId, title: $title) {
    id
  }
}
`;

class AddSectionComponent extends React.Component {
    state = { visible: false, loading: false };

    showModal = () => {
        if (this.props.sections.length >= 20) {
            message.error("作成できるセクションは20までです", 7)
            return;
        }
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.addSection(values.sectionTitle);
            }
        });
    };

    addSection = async (sectionTitle) => {
        this.setState({ loading: true });
        try {
            const { data } = await this.props.client.mutate({
                mutation: ADD_SECTION,
                variables: {
                    bookId: this.props.id,
                    title: sectionTitle
                }
            });

            this.props.addSection(data.addSection.id, sectionTitle)
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
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Button
                    ghost
                    type="primary"
                    icon="plus"
                    style={{ marginRight: '12px' }}
                    onClick={this.showModal}
                >
                    セクションを追加する
                </Button>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>キャンセル</Button>,
                        <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleOk}>追加する</Button>,
                    ]}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            label={
                                <span>
                                    セクション名&nbsp;
                                            <Tooltip title="40文字まで入力できます">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                        >
                            {getFieldDecorator('sectionTitle', {
                                rules: [
                                    { required: true, message: 'セクション名を入力してください', whitespace: true },
                                    { max: 40, message: 'セクション名は40文字までです', whitespace: true },
                                ],
                                initialValue: "",
                            })(<Input />)}
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

const AddSectionForm = connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'add-section' })(AddSectionComponent));
export default withApollo(AddSectionForm)