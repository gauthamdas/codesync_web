import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBquhnb8FEUzjwJywfS8Ifxf6m8LVjl9ag",
    authDomain: "codesync-ooad.firebaseapp.com",
    projectId: "codesync-ooad",
    storageBucket: "codesync-ooad.appspot.com",
    messagingSenderId: "616748410621",
    appId: "1:616748410621:web:c99f252643e7971b21c094",
    measurementId: "G-DB2QH1HJR0"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logout,
};