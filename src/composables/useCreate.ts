import { doc, setDoc } from "firebase/firestore"
import { db } from "../utils/firebase"
import { FB_APP_ID, FB_APP_NAME } from "../utils/types"

export async function useCreate(table: string, data: any) {
  try {
    await setDoc(doc(db, FB_APP_NAME, FB_APP_ID, table, data?.id), data)

    return true
  } catch (error) {
    return error
  }
}