export enum status {
    "ACTIVE" = "active",
    "INACTIVE" = "inactive"
}

export enum role_id {
    "ADMIN" = 1,
    "EMPLOYEE" = 2
}

export enum Role {
    Employee = "user",
    Admin = "admin"
}

export const JWT_SECRET = "somerandomstring";