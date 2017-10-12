import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyAycHj4ZWYpVmQRwSRmcphvteUb_cxRQjI",
  authDomain: "gym-buddy-93316.firebaseapp.com",
  databaseURL: "https://gym-buddy-93316.firebaseio.com",
  projectId: "gym-buddy-93316",
  storageBucket: "gym-buddy-93316.appspot.com",
  messagingSenderId: "1087127242493"
};
var fire = firebase.initializeApp(config);
export default fire;