export interface loginResponseInterface {
    token: string,
    user: User | null
}

export interface User {
    id: number,
    name: string,
    email: string,
    role: string
}