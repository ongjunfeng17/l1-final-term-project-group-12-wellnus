import firebaseApp from './firebase.js';
import { getDocs, getFirestore, where } from 'firebase/firestore';
import { doc, getDoc, collection, query } from 'firebase/firestore';

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

export async function getUserIdByEmail(email) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let id = "";
    querySnapshot.forEach((doc) => {
        id = doc.id;
    });
    return id;
}