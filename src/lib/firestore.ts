import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ResumeData } from "@/types/resume";

const COLLECTION = "resumes";

export async function saveResume(
  userId: string,
  resume: ResumeData
): Promise<string> {
  if (resume.id) {
    const ref = doc(db, COLLECTION, resume.id);
    await updateDoc(ref, {
      ...resume,
      userId,
      updatedAt: serverTimestamp(),
    });
    return resume.id;
  }

  const docRef = await addDoc(collection(db, COLLECTION), {
    ...resume,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserResumes(userId: string): Promise<ResumeData[]> {
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      ...data,
      id: d.id,
      createdAt: (data.createdAt as Timestamp)?.toDate(),
      updatedAt: (data.updatedAt as Timestamp)?.toDate(),
    } as ResumeData;
  });
}

export async function deleteResume(resumeId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, resumeId));
}