import getFirebase from "utils/firebase";

const getToken = async () => {
    const firebase = getFirebase();
    return new Promise((resolve, reject) => {
        const f_auth = firebase.auth();
        f_auth.onAuthStateChanged(user => {
            if (user) {
                resolve(user.getIdToken(false));
            } else {
                reject();
            }
        });
    });
}

export default getToken