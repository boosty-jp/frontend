import React from "react"
import LargeLogo from "components/logo/large"
import { Layout } from 'antd';
import NOSEO from 'components/seo/noseo'
import withLocation from "components/wrapper/location";
import HorizontalFooter from "components/layout/horizontal/footer";
import VerticalFooter from "components/layout/vertical/footer";
import getFirebase from "utils/firebase";
import ResetPasswordForm from 'components/auth/password-reset'
import VerifyMailInfo from 'components/auth/verify-mail'
import SimpleLayout from "components/layout/simple-layout";

const { Content } = Layout;


const MailVerifyPage = ({ search }) => {
    const { mode, oobCode, continueUrl, lang } = search
    const firebase = getFirebase();
    let auth;
    if (firebase) {
        auth = firebase.auth();
    }

    var component;
    var title;
    var description;

    switch (mode) {
        case 'resetPassword':
            component = <ResetPasswordForm auth={auth} actionCode={oobCode} continueUrl={continueUrl} lang={lang} />
            title = "パスワードの再設定"
            description = "パスワードを再設定します。6文字以上のパスワードを設定してください。"
            break;
        case 'verifyEmail':
            component = <VerifyMailInfo auth={auth} actionCode={oobCode} />
            title = "メール認証の確認"
            description = "ご登録いただいたメールアドレスの所有者確認を行います。"
            break;
        default:
            // 認証時にmodeなしでリダイレクトして、ここを通るため404にリダイレクトはさせない
            component = <></>
            title = ""
            description = ""
            break;
    }

    return (
        <SimpleLayout maxWidth="600px" width="100%" minHeight="400px" height="400px">
            <NOSEO title={title} description={description} />
            <div style={{ margin: '20px', width: '100%', padding: '20px', backgroundColor: 'white', borderRadius: '0.25rem' }}>
                {component}
            </div>
        </SimpleLayout>
    )
}

export default withLocation(MailVerifyPage)