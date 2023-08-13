import { v4 } from "uuid"
export const DATE = new Date().toISOString()

export const FB_APP_ID = "etP9QbnP2xhmoDb5C2mF"
export const FB_APP_NAME = "moodle"

// = INTERFACES =====================================================

interface IBase {
  readonly createdAt?: string
  readonly id?: string
  isActive?: boolean
  isLock?: boolean
  modifiedBy?: string
  updatedAt?: string
}

export interface ICheck {
  check: boolean
  createdAt?: string
  updatedAt?: string
  userId: string
}

export enum ERole { "admin", "designer", "developer", "guest", "superuser", "teacher" }

export interface IFaculty extends IBase {
  name: string
}

export interface IProgram extends IBase {
  facultyId: string
  name: string
}

export interface IResource extends IBase {
  bibliography: string
  component: string
  content: string
  facultyId: string
  index: string
  introduction: string
  programId: string
  summary: string
  teacher: string
  title: string
  unit: string
  userId: string
}

export interface IRole extends IBase {
  description?: string
  name: string
}

export interface IUser extends IBase {
  email: string
  image?: string
  name?: string
  phone?: string
  provider?: string
  roles?: Array<string>
}

// = MODELS =========================================================

export const Check = (db: ICheck) => {
  return {
    check: String(db.check === true ? true : false),
    createdAt: String(db.createdAt ? db.createdAt : DATE),
    updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
    userId: String(db.userId ? db.userId : ""),
  }
}

export const Faculty = (db: IFaculty) => {
  return {
    createdAt: String(db.createdAt ? db.createdAt : DATE),
    id: String(db.id ? db.id : v4()),
    isActive: Boolean(db.isActive === true ? true : false),
    isLock: Boolean(db.isLock === true ? true : false),
    modifiedBy: String(db.modifiedBy ? db.modifiedBy : ""),
    name: String(db.name.trim()),
    updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
  }
}

export const RefFaculty = (db: IFaculty) => {
  return {
    id: String(db.id ? db.id : v4()),
    isActive: Boolean(db.isActive === true ? true : false),
    name: String(db.name.trim()),
  }
}

export const Program = (db: IProgram) => {
  return {
    createdAt: String(db.createdAt ? db.createdAt : DATE),
    facultyId: String(db.facultyId ? db.facultyId.trim() : ""),
    id: String(db.id ? db.id : v4()),
    isActive: Boolean(db.isActive === true ? true : false),
    isLock: Boolean(db.isLock === true ? true : false),
    modifiedBy: String(db.modifiedBy ? db.modifiedBy : ""),
    name: String(db.name.trim()),
    updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
  }
}

export const RefProgram = (db: IProgram) => {
  return {
    facultyId: Object(db.facultyId ? db.facultyId : {}),
    id: String(db.id ? db.id : v4()),
    isActive: Boolean(db.isActive === true ? true : false),
    name: String(db.name.trim()),
  }
}

export const Resource = (db: IResource) => {
  return {
    bibliography: String(db.bibliography ? db.bibliography.trim() : ""),
    component: String(db.component ? db.component.trim() : ""),
    content: String(db.content ? db.content.trim() : ""),
    createdAt: String(db.createdAt ? db.createdAt : DATE),
    id: String(db.id ? db.id : v4()),
    facultyId: String(db.facultyId ? db.facultyId : ""),
    index: String(db.index ? db.index.trim() : ""),
    introduction: String(db.introduction ? db.introduction.trim() : ""),
    isActive: Boolean(db.isActive === true ? true : false),
    isLock: Boolean(db.isLock === true ? true : false),
    modifiedBy: String(db.modifiedBy ? db.modifiedBy : ""),
    programId: String(db.programId ? db.programId : ""),
    summary: String(db.summary ? db.summary.trim() : ""),
    teacher: String(db.teacher ? db.teacher.trim() : ""),
    title: String(db.title ? db.title.trim() : ""),
    unit: String(db.unit ? db.unit.trim() : ""),
    updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
    userId: String(db.userId ? db.userId : ""),
  }
}

export const RefResource = (db: IResource) => {
  return {
    id: String(db.id ? db.id : v4()),
    isActive: Boolean(db.isActive === true ? true : false),
    teacher: String(db.teacher ? db.teacher.trim() : ""),
    isLock: Boolean(db.isLock === true ? true : false),
    title: String(db.title ? db.title.trim() : ""),
    unit: String(db.unit ? db.unit.trim() : ""),
  }
}

export const Role = (db: IRole) => {
  return {
    createdAt: String(db.createdAt ? db.createdAt : DATE),
    description: String(db.description ? db.description.trim() : ""),
    id: String(db.id ? db.id : v4()),
    isActive: Boolean(db.isActive === true ? true : false),
    isLock: Boolean(db.isLock === true ? true : false),
    modifiedBy: String(db.modifiedBy ? db.modifiedBy : ""),
    name: String(db.name.trim()),
    updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
  }
}

export const RefRole = (db: IRole) => {
  return {
    id: String(db.id ? db.id : v4()),
    isActive: Boolean(db.isActive === true ? true : false),
    name: String(db.name.trim()),
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
    modifiedBy: String(db.modifiedBy ? db.modifiedBy : ""),
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

