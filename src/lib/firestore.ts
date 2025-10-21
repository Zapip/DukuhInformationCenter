import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { umkm } from "@/types/umkm";

export const getAllUMKM = async () => {
  const snapshot = await getDocs(collection(db, "umkm"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addUMKM = async (data: umkm) => {
  await addDoc(collection(db, "umkm"), data);
};
