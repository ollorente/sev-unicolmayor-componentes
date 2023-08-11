import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./../utils/firebase"
import useTypes from "./useTypes"
const { FB_APP_ID, FB_APP_NAME } = useTypes()

export default () => {
  const fsCreate = async (table: string, data: any) => {
    try {
      await setDoc(doc(db, FB_APP_NAME, FB_APP_ID, table, data?.id), data)

      return true
    } catch (error) {
      return error
    }
  }

  const fsGet = async (table: string, id: string) => {
    try {
      const docRef = doc(db, FB_APP_NAME, FB_APP_ID, table, id)
      const docSnap: any = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        return null
      }
    } catch (error) {
      return error
    }
  }

  const fsList = async (table: string) => {
    try {
      const q = query(collection(db, FB_APP_NAME, FB_APP_ID, table), where("isLock", "==", false))

      const querySnapshot = await getDocs(q)

      let items: any = []

      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })

      return items.length > 0 ? items : []
    } catch (error) {
      return error
    }
  }

  const fsListProgramsById = async (table: string, id: string) => {
    try {
      const q = query(collection(db, FB_APP_NAME, FB_APP_ID, table), where("facultyId", "==", id), where("isLock", "==", false))

      const querySnapshot = await getDocs(q)

      let items: any = []

      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })

      return items.length > 0 ? items : []
    } catch (error) {
      return error
    }
  }

  const fsRemove = async (table: string, id: string) => {
    try {
      await deleteDoc(doc(db, FB_APP_NAME, FB_APP_ID, table, id))

      return true
    } catch (error) {
      return error
    }
  }

  const fsUpdate = async (table: string, id: string, data: any) => {
    try {
      const itemRef = doc(db, FB_APP_NAME, FB_APP_ID, table, id)

      await updateDoc(itemRef, data)

      return true
    } catch (error) {
      return error
    }
  }

  return {
    fsCreate,
    fsGet,
    fsList,
    fsListProgramsById,
    fsRemove,
    fsUpdate,
  }
}
