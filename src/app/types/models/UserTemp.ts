import Role from "./Role"


type UserTemp = {
    id: string
    nombre: string
    lastname: string
    username: string
    email: string
    createdAt: string
    updatedAt:string
    role : Role
}

export default UserTemp