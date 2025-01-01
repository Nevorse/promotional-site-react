import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import store from "./store";
import { loginHandle, logoutHandle } from "./store/auth";
import { getStorage, deleteObject, ref, listAll } from "firebase/storage";
import { setAllData } from "./setFuncs";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export const storage = getStorage(app);

try {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(
        loginHandle({
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
        })
      );
    } else {
      store.dispatch(logoutHandle());
    }
  });
} catch (err) {
  toast.error(err.message);
}

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message, {
      duration: 1000,
    });
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
/* -----------Helpers----------- */
export const getDocumentCount = async (coll) => {
  const q = collection(db, coll);
  const snapshot = await getCountFromServer(q);
  return snapshot?.data()?.count;
};
export const getLastData = async (coll) => {
  const q = query(collection(db, coll), orderBy("index", "desc"), limit(1));
  const snapshot = await getDocs(q);
  return snapshot?.docs[0]?.data();
};
/* -----------Database----------- */
export const getAllData = async (coll, lim) => {
  if (coll) {
    const params = [collection(db, coll), orderBy("index", "desc")];
    if (lim) params.push(limit(lim));
    const q = query(...params);
    try {
      const querySnapshot = await getDocs(q);
      let allData = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        docData["id"] = doc.id;
        allData.push(docData);
      });
      return allData;
    } catch (err) {
      toast.error(err.message);
    }
  } else return [];
};
export const updateAllDataAlignment = async (coll, data) => {
  const dataArr = [...data];
  const revArr = dataArr.reverse();

  for (let i = 0; i < revArr.length; i++) {
    const docRef = doc(db, coll, revArr[i].id);
    const upData = {
      index: i,
    };
    try {
      updateDoc(docRef, upData);
    } catch (err) {
      toast.error(err.message);
    }
  }
};
export const getSingleData = async (coll, id) => {
  const docRef = doc(db, coll, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // const docData = docSnap.data();
      // docData["id"] = docSnap.id;
      // return docData;
      return true;
    } else {
      return false;
    }
  } catch (err) {
    toast.error(err.message);
  }
};
/***/
export const addData = async (coll, data, title, content, docRef) => {
  let docum = {};
  const lastData = await getLastData(coll);
  const count = lastData?.index || 0;
  docum["index"] = count + 1;

  if (data) docum["data"] = data;
  if (title) docum["title"] = title;
  if (content && coll == "service_albums") docum["content"] = content;

  try {
    if (docRef) {
      const response = await setDoc(docRef, docum);
      return response;
    } else {
      const q = collection(db, coll);
      const response = await addDoc(q, docum);
      return response;
    }
  } catch (err) {
    toast.error(err.message);
  }
};
export const updateData = async (
  coll,
  id,
  data,
  title,
  content,
  coverTexts,
  prevDocImagesCount
) => {
  const docRef = doc(db, coll, id);
  const updateFunction = () => {
    const docum = {};
    docum["data"] = data;
    if (coll == "cover_images") docum["cover_texts"] = coverTexts;
    else {
      docum["title"] = title;
      docum["content"] = content;
    }

    try {
      updateDoc(docRef, docum);
    } catch (err) {
      toast.error(err.message);
    }
  };
  if (prevDocImagesCount < 1) {
    const docCheck = await getSingleData(coll, id);
    if (docCheck) updateFunction();
    else if (!docCheck) addData(coll, data, title, content, docRef);
  } else {
    updateFunction();
  }
};
export const deleteDocument = async (coll, id) => {
  const docRef = doc(db, coll, id);
  const imagesRef = ref(storage, `/images/${coll}/${id}`);

  listAll(imagesRef)
    .then((response) => {
      const promises = response.items.map((ref) => deleteObject(ref));
      return Promise.all(promises);
    })
    .then(() => {
      toast.success("Resimler Silindi.");
      deleteDoc(docRef)
        .then(() => {
          toast.success("Albüm silindi.");
          setAllData(coll);
        })
        .catch((err) => toast.error(err.code));
    })
    .catch((err) => toast.error(err.code));
};

export default app;
