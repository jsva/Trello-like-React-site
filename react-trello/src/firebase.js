import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './tokensandkeys/firebasetokens'


  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  const boardsRef = db.collection('boards');
  const listsRef = db.collection('lists');
  const cardsRef = db.collection('cards');

  export {boardsRef, listsRef, cardsRef };