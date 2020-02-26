import * as firebase from 'firebase'
import 'firebase/auth';
import 'firebase/storage';

var config = {
    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.GATSBY_FIREBASE_APP_ID,
    measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};

let instance;
let googleProvider;
let facebookProvider;
let githubProvider;

export default function getFirebase() {
    if (typeof window !== 'undefined') {
        if (instance) {
            return instance;
        }
        instance = firebase.initializeApp(config);
        return instance;
    }

    return null;
}

export const getGoogleProvider = () => {
    if (typeof window !== 'undefined') {
        if (googleProvider) return googleProvider;
        googleProvider = new firebase.auth.GoogleAuthProvider();
        return googleProvider;
    }

    return null;
}

export const getFacebookProvider = () => {
    if (typeof window !== 'undefined') {
        if (facebookProvider) return facebookProvider;
        facebookProvider = new firebase.auth.FacebookAuthProvider();
        return facebookProvider;
    }

    return null;
}

export const getGitHubProvider = () => {
    if (typeof window !== 'undefined') {
        if (githubProvider) return githubProvider;
        githubProvider = new firebase.auth.GithubAuthProvider();
        return githubProvider;
    }

    return null;
}



// import * as firebase from 'firebase'
// import 'firebase/auth';
// import 'firebase/storage';

// var config = {
//     apiKey: process.env.GATSBY_FIREBASE_API_KEY,
//     authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
//     projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.GATSBY_FIREBASE_APP_ID,
//     measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
// };

// let instance;
// let googleProvider;
// let facebookProvider;
// let githubProvider;

// // SSR時にfirebaseの読み込みでエラーが発生する対策
// // https://github.com/firebase/firebase-js-sdk/issues/2222
// let getFirebase;
// let GoogleProvider;
// let FacebookProvider;
// let GitHubProvider;
// let _functions
// if (typeof window !== "undefined") {
//     getFirebase = () => {
//         if (typeof window !== 'undefined') {
//             if (instance) {
//                 return instance;
//             }
//             instance = firebase.initializeApp(config);
//             return instance;
//         }

//         return null;
//     }

//     GoogleProvider = () => {
//         if (typeof window !== 'undefined') {
//             if (googleProvider) return googleProvider;
//             googleProvider = new firebase.auth.GoogleAuthProvider();
//             return googleProvider;
//         }

//         return null;
//     }

//     FacebookProvider = () => {
//         if (typeof window !== 'undefined') {
//             if (facebookProvider) return facebookProvider;
//             facebookProvider = new firebase.auth.FacebookAuthProvider();
//             return facebookProvider;
//         }

//         return null;
//     }

//     GitHubProvider = () => {
//         if (typeof window !== 'undefined') {
//             if (githubProvider) return githubProvider;
//             githubProvider = new firebase.auth.GithubAuthProvider();
//             return githubProvider;
//         }

//         return null;
//     }
// }

// export default getFirebase;
// export const getGoogleProvider = GoogleProvider;
// export const getFacebookProvider = FacebookProvider;
// export const getGitHubProvider = GitHubProvider;