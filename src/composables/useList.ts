import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../utils/firebase"
import { FB_APP_ID, FB_APP_NAME } from "../utils/types"

export async function useList(table: string) {
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