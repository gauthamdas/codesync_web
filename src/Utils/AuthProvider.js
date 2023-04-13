import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

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
// const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
const signInWithGoogle = async () => {

    try {
        await setPersistence(auth, browserSessionPersistence); // set persistence to browser session
        const result = await signInWithPopup(auth, googleProvider); // sign in with Google using popup
        const user = result.user;
        console.log(user, await user.getIdTokenResult(true));
        return { auth: true, accessToken: user.accessToken, name: user.displayName, email: user.email, photo: user.photoURL}
      } catch (error) {
        console.error(error);
        return { auth: false, accessToken: null, name: null, email: null, photo: null}
      }
  
};



const logout = () => {
  signOut(auth);
};
export {
  auth,
  signInWithGoogle,
  logout,
};