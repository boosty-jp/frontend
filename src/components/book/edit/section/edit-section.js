import React from 'react';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { message, Modal, Button, Form, Input, Tooltip, Icon } from 'antd';
import { updateSectionTitle } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";

const UPDATE_SECTION_TITLE = gql`
mutation updateSectionTitle($bookId: ID!, $sectionId: ID!, $title: String!) {
  updateSectionTitle(bookId: $bookId, sectionId: $sectionId, title: $title)
}
`;

class EditSectionComponent extends React.Component {
    state = { visible: false, loading: false };

    showModal = e => {
        e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        e.preventDefault();
        e.stopPropagation();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.updateSection(values.sectionTitle);
            }
        });
    };

    updateSection = async (sectionTitle) => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: UPDATE_SECTION_TITLE,
                variables: {
                    bookId: this.props.id,
                    sectionId: this.props.sectionId,
                    title: sectionTitle
                }
            });

            this.props.updateSectionTitle(this.props.sectionId, sectionTitle)
            message.success("セクション名を更新しました。", 7)
            this.setState({ visible: false, loading: false });
        } catch (err) {
            message.error(getErrorMessage(err), 7);
            this.setState({ loading: false });
        }
    };

    handleCancel = e => {
        e.stopPropagation();
        this.setState({
            visible: false,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Icon type="edit" style={{ marginRight: '16px' }} onClick={this.showModal} />
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>キャンセル</Button>,
                        <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleOk}>更新する</Button>,
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
                                initialValue: this.props.sectionTitle,
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
    updateSectionTitle: (id, title) => dispatch(updateSectionTitle(id, title)),
})

const EditSectionForm = connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'edit-section' })(EditSectionComponent));
export default withApollo(EditSectionForm)