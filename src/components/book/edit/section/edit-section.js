import React from 'react';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { message, Modal, Button, Form, Input, Tooltip } from 'antd';
import { updateSectionTitle } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";
import { EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const UPDATE_SECTION_TITLE = gql`
mutation updateSectionTitle($bookId: ID!, $sectionId: ID!, $title: String!) {
  updateSectionTitle(bookId: $bookId, sectionId: $sectionId, title: $title)
}
`;

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 7, span: 16 },
};

class EditSectionComponent extends React.Component {
    state = { visible: false, loading: false };

    showModal = e => {
        e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    updateSection = async (values) => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: UPDATE_SECTION_TITLE,
                variables: {
                    bookId: this.props.id,
                    sectionId: this.props.sectionId,
                    title: values.sectionTitle
                }
            });

            this.props.updateSectionTitle(this.props.sectionId, values.sectionTitle)
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
        return (
            <>
                <EditOutlined style={{ marginRight: '16px' }} onClick={this.showModal} />
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        onFinish={this.updateSection}
                        initialValues={{ sectionTitle: this.props.sectionTitle }}
                        {...layout}
                        style={{ marginTop: '30px' }}
                    >
                        <Form.Item
                            name="sectionTitle"
                            label={<SectionLabel />}
                            rules={[
                                { required: true, message: 'セクション名を入力してください', whitespace: true },
                                { max: 40, message: 'セクション名は40文字までです', whitespace: true },
                            ]}
                        >
                            <Input
                                onFocus={e => e.stopPropagation()}
                                onBlur={e => e.stopPropagation()}
                                onChange={e => e.stopPropagation()}
                                onClick={e => e.stopPropagation()}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleOk}>更新する</Button>
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

const EditSectionForm = connect(mapStateToProps, mapDispatchToProps)(EditSectionComponent);
export default withApollo(EditSectionForm)

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