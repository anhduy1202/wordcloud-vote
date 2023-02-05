export interface Auth {
    user: User
    expires: string
}
export interface User {
    name: string
    email: string
    image: string
}