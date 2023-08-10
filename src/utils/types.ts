import { v4 } from "uuid"
export const DATE = new Date().toISOString()

// = INTERFACES =====================================================

interface IBase {
  readonly createdAt?: string
  readonly id?: string
  isActive?: boolean
  isLock?: boolean
  updatedAt?: string
}

export interface ICheck {
  check: boolean
  createdAt: string
  userId: string
}

export enum ERole { "admin", "designer", "developer", "guest", "superuser", "teacher" }

export interface IProgram extends IBase {
  approved: ICheck
  bibliography: string
  content: string
  elaborated: ICheck
  facultyId: string
  index: string
  integrated: ICheck
  introduction: string
  programId: string
  revised: ICheck
  summary: string
  teacher: string
  title: string
  unit: string
}

export interface IUser extends IBase {
  email: string
  image: string
  name: string
  phone: string
  provider: string
  roles: Array<string>
}

// = MODELS =========================================================

export const Program = (db: IProgram) => {
  return {
    approved: Object(db.approved ? db.approved : {}),
    bibliography: String(db.bibliography ? db.bibliography : ""),
    content: String(db.content ? db.content : ""),
    createdAt: String(db.createdAt ? db.createdAt : ""),
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
    updatedAt: String(db.updatedAt ? db.updatedAt : ""),
  }
}

export const RefProgram = (db: IProgram) => {
  return {
    id: String(db.id ? db.id : v4()),
    isActive: Boolean(db.isActive === true ? true : false),
    teacher: String(db.teacher ? db.teacher : ""),
    title: String(db.title ? db.title : ""),
    unit: String(db.unit ? db.unit : ""),
  }
}

export const User = (db: IUser) => {
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

export const RefUser = (db: IUser) => {
  return {
    id: String(db.id ? db.id : v4()),
    image: String(db.image ? db.image.trim() : ""),
    isActive: Boolean(db.isActive === true ? true : false),
    name: String(db.name ? db.name.trim() : ""),
  }
}

