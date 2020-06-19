import React from 'react';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { message, Popconfirm } from 'antd';
import { deleteSection } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const DELETE_SECTION = gql`
mutation deleteSection($bookId: ID!, $sectionId: ID!) {
  deleteSection(bookId: $bookId, sectionId: $sectionId)
}
`;

class DeleteSectionComponent extends React.Component {
    deleteSection = async (e) => {
        e.stopPropagation();
        try {
            await this.props.client.mutate({
                mutation: DELETE_SECTION,
                variables: {
                    bookId: this.props.id,
                    sectionId: this.props.sectionId
                }
            });

            this.props.deleteSection(this.props.sectionId)
            message.success("セクションを削除しました。", 7)
        } catch (err) {
            message.error(getErrorMessage(err), 7);
        }
    };

    render() {
        return (
            <Popconfirm
                okText="削除"
                cancelText="キャンセル"
                title="本当に削除しますか？"
                onConfirm={this.deleteSection}
                onCancel={e => e.stopPropagation()}
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            >
                {this.props.children ?
                    this.props.children
                    :
                    <DeleteOutlined onClick={e => e.stopPropagation()} />
                }
            </Popconfirm>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    deleteSection: (id) => dispatch(deleteSection(id)),
})

const DeleteSection = connect(null, mapDispatchToProps)(DeleteSectionComponent);
export default withApollo(DeleteSection)