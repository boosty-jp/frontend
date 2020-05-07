import React from 'react';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { message, Popconfirm } from 'antd';
import { deletePage } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const DELETE_PAGE = gql`
mutation deletePage($pageId: ID!) {
  deletePage(pageId: $pageId)
}
`;

class DeletePageComponent extends React.Component {
    deletePage = async (e) => {
        e.stopPropagation();
        try {
            await this.props.client.mutate({
                mutation: DELETE_PAGE,
                variables: {
                    pageId: this.props.id
                }
            });

            this.props.deletePage(this.props.id)
            message.success("ページを削除しました。", 7)
        } catch (err) {
            message.error(getErrorMessage(err), 7);
        }
    };

    render() {
        return (
            <Popconfirm
                okText="削除"
                cancelText="キャンセル"
                onConfirm={this.deletePage}
                title="本当に削除しますか？"
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            >
                <DeleteOutlined onClick={e => e.stopPropagation()} style={{ color: "rgb(0, 0, 0, 0.65)" }} />
            </Popconfirm>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    deletePage: (id) => dispatch(deletePage(id)),
})

const DeletePage = connect(null, mapDispatchToProps)(DeletePageComponent);
export default withApollo(DeletePage)