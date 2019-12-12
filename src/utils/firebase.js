import * as firebase from "firebase/app";
import "firebase/auth";

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