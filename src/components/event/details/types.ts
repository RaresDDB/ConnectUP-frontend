import { Tag } from "../../../types/tag-types"
import { User } from "../../../types/user-types"

export interface EventDetailsProps {
    tags: Tag[]
    host: User,
    title: string,
    gallery: string[],
    imageUri: string,
    attendees: User[],
    description: string
}