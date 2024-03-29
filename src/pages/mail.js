import React from "react"
import NOSEO from 'components/seo/noseo'
import withLocation from "components/wrapper/location";
import getFirebase from "utils/firebase";
import ResetPasswordForm from 'components/auth/password-reset'
import VerifyMailInfo from 'components/auth/verify-mail'
import SimpleLayout from "components/layout/simple-layout";
import RecoverMail from "components/auth/recover-mail";

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
        case 'recoverEmail':
            component = <RecoverMail auth={auth} actionCode={oobCode} />
            title = "メールアドレスの復元"
            description = "変更する前のメールアドレスに復元します。"
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
        <SimpleLayout maxWidth="500px" width="100%" >
            <NOSEO title={title} description={description} />
            <div style={{ margin: '50px auto', width: '100%', padding: '20px', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                {component}
            </div>
        </SimpleLayout>
    )
}

export default withLocation(MailVerifyPage)