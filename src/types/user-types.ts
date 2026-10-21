import { Tag } from "./tag-types"
import { Role } from "./role-types"

export type User = {
    id: string,
    lastName: string,
    firstName: string,
    username: string,
    email: string,
    avatarUri: string | null,
    tags: Tag[],
    role: Role,
    gender: string,
    birthDate: string
}