import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

  const email="hi@gmail.com"
const password = "hihello"
const firebaseConfig = {
// add config here
};

const app = initializeApp(firebaseConfig);

export async function signUp(email, password){
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    return {success:true, user}
  } catch(err) {
    return {success:false, err}
  }
}

export async function signIn(email, password){
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    return {success:true, user}
  }
  catch(err) {
      return {success:false, err}
  }
}
