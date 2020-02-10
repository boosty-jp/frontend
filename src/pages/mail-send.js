import React from "react"
import { Result, Icon, message } from 'antd';
import getFirebase from 'utils/firebase'
import SimpleLayout from 'components/layout/simple-layout'


const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    margin: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const MailSendPage = () => {
    const reSend = () => {
        const firebase = getFirebase();
        firebase.auth().onAuthStateChanged((user) => {
            if (user.emailVerified) {
                message.error("すでに認証済みです", 5)
                return;
            }

            user.sendEmailVerification().then(() => {
                message.info("メールを再送しました", 5)
            }).catch(() => {
                message.error("エラーが発生しました。時間をおいて、再度実施ください。", 7)
            });
        });
    }

    return (
        <SimpleLayout maxWidth="500px" width="100%" >
            <div style={cardStyle}>
                <Result
                    icon={<Icon type="mail" theme="twoTone" />}
                    title="認証用のメールを送りました。"
                    subTitle={<p>メールから認証を完了してください</p>}
                    extra={[<p>※ メールが届かない場合は<a href="/#" onClick={() => reSend()}>こちら</a>から再送してください</p>]}
                />
            </div>
        </SimpleLayout>
    )
}
export default MailSendPage