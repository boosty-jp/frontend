import { message } from 'antd';
import * as LocalUser from "services/local-user";
import getFirebase from "utils/firebase";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

export const logout = () => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
        LocalUser.logout(() => {
            navigate("/home");
            message.info('ログアウトしました', 5);
        });
    }).catch(() => {
        message.error("エラーが発生しました。", 5);
    });
}