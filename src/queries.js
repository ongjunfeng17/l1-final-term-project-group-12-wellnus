import firebaseApp from './firebase.js';
import { getDocs, getFirestore } from 'firebase/firestore';
import { doc, getDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebaseApp)

export async function getUserRole(userId) {
    const docRef = doc(db, "users", userId);
    const user = await getDoc(docRef);
    if (user.exists()) {
        const data = user.data();
        if (data["isDoctor"]) {
            return "doctor";
        } else {
            return "patient";
        }
    }
    return null;
};