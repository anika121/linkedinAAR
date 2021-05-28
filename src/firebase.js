import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyC3xwvPMHCWrC6IRBRLPXtVcZlAgDJbb1g",
	authDomain: "aarlinkedin.firebaseapp.com",
	projectId: "aarlinkedin",
	storageBucket: "aarlinkedin.appspot.com",
	messagingSenderId: "469992101170",
	appId: "1:469992101170:web:7e457a5d7b93d328e9f32b",
	measurementId: "G-NXBSBLQ3F4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;