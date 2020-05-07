import React from "react"
import { Input, Alert, message, Button, Modal } from 'antd';
import getFirebase from 'utils/firebase'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { logout } from 'services/local-user'
import { WarningOutlined } from "@ant-design/icons";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const DELETE_USER = gql`
mutation DeleteUser{
    deleteUser
}
`;

class UserDeleteForm extends React.Component {
    state = {
        currentMail: '',
        confirmMail: '',
        loading: false,
        deleteModalVisible: false,
    };

    componentDidMount() {
        const firebase = getFirebase();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ currentMail: user.email });
            }
        })
    }

    delete = async () => {
        if (this.state.confirmMail === this.state.currentMail) {
            this.setState({ loading: true })
            try {
                await this.props.client.mutate({
                    mutation: DELETE_USER,
                });

                const firebase = getFirebase();
                firebase.auth().signOut().then(() => {
                    logout(() => {
                        navigate("/");
                        message.success('ユーザーを削除しました', 7)
                    });
                }).catch(() => {
                    navigate("/");
                });

            } catch (err) {
                message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
            }
            this.setState({ loading: false, deleteModalVisible: false });
        } else {
            message.error("正しいメールアドレスを入力してください", 7)
        }
    }

    render() {
        return (
            <>
                <Alert
                    type="error"
                    description={<p>アカウント削除した後、そのアカウントの復旧は行なえません。作成したコンテンツもすべて削除されます。同意の上、削除してください。</p>}
                    message="この操作は取り消せません"
                    showIcon
                    icon={<WarningOutlined />}
                />
                <div style={{ margin: '20px auto 0px auto' }}>
                    <Button type="danger" onClick={() => this.setState({ deleteModalVisible: true })}>削除する</Button>
                </div>
                <Modal
                    title={<span style={{ color: 'red', fontWeight: '500' }}><WarningOutlined style={{ marginRight: '8px' }} />アカウントを削除する</span>}
                    visible={this.state.deleteModalVisible}
                    onOk={this.delete}
                    onCancel={() => this.setState({ deleteModalVisible: false })}
                    footer={[
                        <Button key="cancel" onClick={() => this.setState({ deleteModalVisible: false })}>キャンセル</Button>,
                        <Button key="delete" type="danger" loading={this.state.loading} onClick={this.delete}>削除する</Button>,
                    ]}
                >
                    <p>確認のため、メールアドレス「<b>{this.state.currentMail}</b>」を入力してください。</p>
                    <Input placeholder={this.state.currentMail} onChange={(e) => this.setState({ confirmMail: e.target.value })} />
                </Modal>
            </>
        );
    }
}

export default withApollo(UserDeleteForm)