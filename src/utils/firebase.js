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
let twitterProvider;
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

export const getGitHubProvider = () => {
    if (typeof window !== 'undefined') {
        if (githubProvider) return githubProvider;
        githubProvider = new firebase.auth.GithubAuthProvider();
        return githubProvider;
    }

    return null;
}

export const getTwitterProvider = () => {
    if (typeof window !== 'undefined') {
        if (twitterProvider) return twitterProvider;
        twitterProvider = new firebase.auth.TwitterAuthProvider();
        return twitterProvider;
    }

    return null;
}