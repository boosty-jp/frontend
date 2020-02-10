import React from 'react';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { message, Popconfirm, Icon } from 'antd';
import { deleteSection } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";

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
                onConfirm={this.deleteSection}
                title="本当に削除しますか？"
                icon={<Icon type="exclamation-circle" style={{ color: 'red' }} />}
            >
                <Icon type="delete" onClick={e => e.stopPropagation()} />
            </Popconfirm>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    deleteSection: (id) => dispatch(deleteSection(id)),
})

const DeleteSection = connect(null, mapDispatchToProps)(DeleteSectionComponent);
export default withApollo(DeleteSection)