export interface Auth {
    user: User
    expires: string
}
export interface User {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id?: string | null | undefined
}