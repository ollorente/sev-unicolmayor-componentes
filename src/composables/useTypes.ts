import { v4 } from "uuid"
import { ICheck, IFaculty, IProgram, IResource, IRole, IUser } from "./../utils/types"

const DATE = new Date().toISOString()
const FB_APP_ID = "etP9QbnP2xhmoDb5C2mF"
const FB_APP_NAME = "moodle"

export default () => {
  // = MODELS =========================================================

  const Check = (db: ICheck) => {
    return {
      check: String(db.check === true ? true : false),
      createdAt: String(db.createdAt ? db.createdAt : DATE),
      updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
      userId: String(db.userId ? db.userId : ""),
    }
  }

  const Faculty = (db: IFaculty) => {
    return {
      createdAt: String(db.createdAt ? db.createdAt : DATE),
      id: String(db.id ? db.id : v4()),
      isActive: Boolean(db.isActive === true ? true : false),
      isLock: Boolean(db.isLock === true ? true : false),
      name: String(db.name.trim()),
      updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
    }
  }

  const RefFaculty = (db: IFaculty) => {
    return {
      id: String(db.id ? db.id : v4()),
      isActive: Boolean(db.isActive === true ? true : false),
      name: String(db.name.trim()),
    }
  }

  const Program = (db: IProgram) => {
    return {
      createdAt: String(db.createdAt ? db.createdAt : DATE),
      facultyId: String(db.facultyId ? db.facultyId.trim() : ""),
      id: String(db.id ? db.id : v4()),
      isActive: Boolean(db.isActive === true ? true : false),
      isLock: Boolean(db.isLock === true ? true : false),
      name: String(db.name.trim()),
      updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
    }
  }

  const RefProgram = (db: IProgram) => {
    return {
      facultyId: Object(db.facultyId ? db.facultyId : {}),
      id: String(db.id ? db.id : v4()),
      isActive: Boolean(db.isActive === true ? true : false),
      name: String(db.name.trim()),
    }
  }

  const Resource = (db: IResource) => {
    return {
      approved: Object(db.approved ? db.approved : {}),
      bibliography: String(db.bibliography ? db.bibliography.trim() : ""),
      component: String(db.component ? db.component.trim() : ""),
      content: String(db.content ? db.content.trim() : ""),
      createdAt: String(db.createdAt ? db.createdAt : DATE),
      elaborated: Object(db.elaborated ? db.elaborated : {}),
      id: String(db.id ? db.id : v4()),
      facultyId: String(db.facultyId ? db.facultyId : ""),
      index: String(db.index ? db.index.trim() : ""),
      integrated: Object(db.integrated ? db.integrated : {}),
      introduction: String(db.introduction ? db.introduction.trim() : ""),
      isActive: Boolean(db.isActive === true ? true : false),
      isLock: Boolean(db.isLock === true ? true : false),
      programId: String(db.programId ? db.programId : ""),
      revised: Object(db.revised ? db.revised : {}),
      summary: String(db.summary ? db.summary.trim() : ""),
      teacher: String(db.teacher ? db.teacher.trim() : ""),
      title: String(db.title ? db.title.trim() : ""),
      unit: String(db.unit ? db.unit.trim() : ""),
      updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
    }
  }

  const RefResource = (db: IResource) => {
    return {
      id: String(db.id ? db.id : v4()),
      isActive: Boolean(db.isActive === true ? true : false),
      teacher: String(db.teacher ? db.teacher.trim() : ""),
      title: String(db.title ? db.title.trim() : ""),
      unit: String(db.unit ? db.unit.trim() : ""),
    }
  }

  const Role = (db: IRole) => {
    return {
      createdAt: String(db.createdAt ? db.createdAt : DATE),
      description: String(db.description ? db.description.trim() : ""),
      id: String(db.id ? db.id : v4()),
      isActive: Boolean(db.isActive === true ? true : false),
      isLock: Boolean(db.isLock === true ? true : false),
      name: String(db.name.trim()),
      updatedAt: String(db.updatedAt ? db.updatedAt : DATE),
    }
  }

  const RefRole = (db: IRole) => {
    return {
      id: String(db.id ? db.id : v4()),
      isActive: Boolean(db.isActive === true ? true : false),
      name: String(db.name.trim()),
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
    FB_APP_ID,
    FB_APP_NAME,
    Check,
    Faculty,
    RefFaculty,
    Program,
    RefProgram,
    Resource,
    RefResource,
    Role,
    RefRole,
    User,
    RefUser,
  }
}  
