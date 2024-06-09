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
  deleteField,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import store from "./store";
import { loginHandle, logoutHandle } from "./store/auth";
import { getStorage } from "firebase/storage";

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
  const q = query(collection(db, coll), orderBy("album", "desc"), limit(1));
  const snapshot = await getDocs(q);
  return snapshot?.docs[0]?.data();
};
export const addDefaultData = async (coll) => {
  const lastData = await getLastData(coll);
  const count = lastData?.album || 0;
  const q = collection(db, coll);
  let upData = {};
  for (let i = 0; i < 6; i++) {
    upData[`photo_${i}`] = "";
  }
  const doc = {
    title: "Title",
    album: count + 1,
    data: upData,
  };
  if (coll == "service_albums")
    doc["content"] = "Content Content Content Content Content Content";

  try {
    const docRef = await addDoc(q, doc);
    return docRef;
  } catch (err) {
    toast.error(err.message);
  }
};
/* -----------Database----------- */
export const getAllData = async (coll, lim) => {
  if (coll[0]) {
    const params = [collection(db, coll), orderBy("album", "desc")];
    if (limit) params.push(limit(lim));
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
      album: i + 1,
    };
    try {
      updateDoc(docRef, upData);
    } catch (err) {
      toast.error(err.message);
    }
  }
  return "Kaydedildi";
};
export const getSingleData = async (coll, id) => {
  const docRef = doc(db, coll, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      docData["id"] = docSnap.id;
      return docData;
    } else {
      toast.error("Döküman bulunamadı!");
    }
  } catch (err) {
    toast.error(err.message);
  }
};
/***/
export const addData = async (coll, data, title, content) => {
  const lastData = await getLastData(coll);
  const count = lastData?.album || 0;
  const q = collection(db, coll);

  const doc = {
    album: count + 1,
    data: data,
  };
  if (title) doc["title"] = title;
  if (content && coll == "service_albums") doc["content"] = content;

  try {
    const docRef = await addDoc(q, doc);
    return docRef;
  } catch (err) {
    toast.error(err.message);
  }
};
export const updateData = async (coll, id, data, title, content) => {
  if (data.length == 0) {
    return toast.error("Fotoğraf yükleyiniz");
  }
  if (!title) {
    return toast.error("Başlık giriniz");
  }
  const docRef = doc(db, coll, id);
  const upData = {
    title,
    data,
  };
  if (coll == "service_albums") upData["content"] = content || "";
  try {
    updateDoc(docRef, upData);
  } catch (err) {
    toast.error(err.message);
  }
};
export const uploadSinglePhoto = async (coll, id, newData) => {
  const docum = await getSingleData(coll, id);
  const docRef = doc(db, coll, id);
  let allDataIndexesArr = [];
  let upData = {};

  if (docum?.doc?.data) {
    const allData = Object.keys(docum.doc.data);
    allData.forEach((data) => allDataIndexesArr.push(Number(data.split("_")[1])));
    allDataIndexesArr.sort((a, b) => b - a);
  } else {
    toast.error("Döküman bulunamadı!");
  }
  const newDataIndex = allDataIndexesArr[0] + 1 || 1;
  upData[`data.photo_${newDataIndex}`] = newData;

  try {
    await updateDoc(docRef, upData);
  } catch (err) {
    toast.error(err.message);
  }
};
export const deleteDocument = async (coll, id) => {
  const docum = await getSingleData(coll, id);
  const docId = docum.id;
  const docRef = doc(db, coll, docId);

  try {
    await deleteDoc(docRef);
    toast.success("Albüm silindi.");
  } catch (err) {
    toast.error(err.message);
  }
};
/***/
export const deleteSingleData = async (coll, id, index) => {
  const docum = await getSingleData(coll, id);

  if (!docum?.data) {
    toast.error("Döküman bulunamadı.");
  }
  let data = docum?.data.filter((e, i) => i != index);
  const delData = { data };

  const docRef = doc(db, coll, id);
  try {
    await updateDoc(docRef, delData);
  } catch (err) {
    toast.error(err.message);
  }
};

export default app;
