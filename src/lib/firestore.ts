import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { umkm } from "@/types/umkm";


export const getAllUMKM = async () => {
    const colRef = collection(db, "umkm");
    const snapshot = await getDocs(colRef);
    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
};

export const getProfile= async() => {
    const colRef = collection(db, "profile");
    const snapshot = await getDocs(colRef);
    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
};

export const addUMKM = async (data: umkm) => {
    await addDoc(collection(db, "umkm"), data);
};

export const updateUMKM = async (id: string, data: Partial<umkm>) => {
    const docRef = doc(db, "umkm", id);
    await updateDoc(docRef, data); 
};

export const deleteUMKM = async (id: string) => {
    const docRef = doc(db, "umkm", id);
    await deleteDoc(docRef); 
};