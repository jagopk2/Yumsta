import { auth, firestore } from "../services/firebase";

import { SignUpAD } from "../types/auth.interface";

export function signup(email: string, password: string) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email: string, password: string) {
  return auth().signInWithEmailAndPassword(email, password);
}
export function resetpassword(email: string) {
  return auth().sendPasswordResetEmail(email);
}
export function signout() {
  return auth().signOut();
}

export const generateUserDocument = async (
  user: firebase.User | null,
  additionalData: SignUpAD
) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid: string) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}
