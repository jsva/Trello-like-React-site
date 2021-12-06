import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './tokensandkeys/firebasetokens';
import 'firebase/auth';


  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  const firebaseAuth = firebase.auth();

  const boardsRef = db.collection('boards');
  const listsRef = db.collection('lists');
  const cardsRef = db.collection('cards');
  const colorsRef = db.collection('colors');

  export {boardsRef, listsRef, cardsRef , colorsRef, firebaseAuth};