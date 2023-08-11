import { v4 } from "uuid"
import { ICheck, IResource, IUser } from "../utils/types"

export default () => {
  const DATE = new Date().toISOString()
  
  // = MODELS =========================================================
  
  const Check = (db: ICheck) => {
    return {
      check: String(db.check === true ? true : false),
      createdAt: String(db.createdAt ? db.createdAt : DATE),
      updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
      userId: String(db.userId ? db.userId : ""),
    }
  }
  
  const Resource = (db: IResource) => {
    return {
      approved: Object(db.approved ? db.approved : {}),
      bibliography: String(db.bibliography ? db.bibliography : ""),
      content: String(db.content ? db.content : ""),
      createdAt: String(db.createdAt ? db.createdAt : DATE),
      elaborated: Object(db.elaborated ? db.elaborated : {}),
      id: String(db.id ? db.id : v4()),
      facultyId: String(db.facultyId ? db.facultyId : ""),
      index: String(db.index ? db.index : ""),
      integrated: Object(db.integrated ? db.integrated : {}),
      introduction: String(db.introduction ? db.introduction : ""),
      isActive: Boolean(db.isActive === true ? true : false),
      isLock: Boolean(db.isLock === true ? true : false),
      programId: String(db.programId ? db.programId : ""),
      revised: Object(db.revised ? db.revised : {}),
      summary: String(db.summary ? db.summary : ""),
      teacher: String(db.teacher ? db.teacher : ""),
      title: String(db.title ? db.title : ""),
      unit: String(db.unit ? db.unit : ""),
      updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
    }
  }
  
  const RefResource = (db: IResource) => {
    return {
      id: String(db.id ? db.id : v4()),
      isActive: Boolean(db.isActive === true ? true : false),
      teacher: String(db.teacher ? db.teacher : ""),
      title: String(db.title ? db.title : ""),
      unit: String(db.unit ? db.unit : ""),
    }
  }
  
  const User = (db: IUser) => {
    return {
      createdAt: String(db.createdAt ? db.createdAt : DATE),
      email: String(db.email ? db.email.trim() : ""),
      id: String(db.id ? db.id : v4()),
      image: String(db.image ? db.image.trim() : ""),
      isActive: Boolean(db.isActive === true ? true : false),
      isLock: Boolean(db.isLock === true ? true : false),
      name: String(db.name ? db.name.trim() : ""),
      phone: String(db.phone ? db.phone.trim() : ""),
      provider: String(db.provider ? db.provider : "local"),
      roles: db.roles ? Array(db.roles) : ["guest"],
      updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
    }
  }
  
  const RefUser = (db: IUser) => {
    return {
      id: String(db.id ? db.id : v4()),
      image: String(db.image ? db.image.trim() : ""),
      isActive: Boolean(db.isActive === true ? true : false),
      name: String(db.name ? db.name.trim() : ""),
    }
  }

  return {
    DATE,
    Check,
    Resource,
    RefResource,
    User,
    RefUser,
  }
}  
