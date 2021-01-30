import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const REACT_APP_FIREBASE_API_KEY = 'AIzaSyBEWX7BaTSvVglZ0rmnN-5_ai2FN95nL-o';
const REACT_APP_FIREBASE_AUTH_DOMAIN = 'fake-9d604.firebaseapp.com';
const REACT_APP_FIREBASE_DATA_BASE_URL = 'https://fake-9d604-default-rtdb.firebaseio.com';
const REACT_APP_FIREBASE_PROJECT_ID = 'fake-9d604';
const REACT_APP_FIREBASE_STORAGE_BUCKET = 'fake-9d604.appspot.com';
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = '763790421406';
const REACT_APP_FIREBASE_APP_ID = '1:763790421406:web:f51492d367ed6677c27a8f';

const app: firebase.app.App = firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATA_BASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
});

const auth: firebase.auth.Auth = app.auth();
export default auth;
