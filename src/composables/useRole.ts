let user: any = false

const current = localStorage.getItem("currentUser")
user = current ? JSON.parse(current) : false
const roles = user.roles

export default {
  admin: roles.includes('admin'),
  designer: roles.includes('designer'),
  developer: roles.includes('developer'),
  guest: roles.includes('guest'),
  superuser: roles.includes('superuser'),
  teacher: roles.includes('teacher')
}