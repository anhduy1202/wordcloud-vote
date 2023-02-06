import { Key } from "react"
import { User } from "./user"

export interface Poll {
    id: String | Key 
    title: String | null
    description: String
    createdAt: Date
    updatedAt: Date
    owner?: User
    responses: String[]
}