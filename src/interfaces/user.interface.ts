export interface User {
    id: string;
    externalId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}
export interface UserCreate {
    externalId: string;
    firstName: string;
    lastName: string;
    email: string;
}
export interface UserUpdate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    cpf?: string | null;
    phone?: string | null;
}
export interface UserUpdateByClerk {
    id?: string;
    externalId?: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserRepository {
    findAllEventsByExternalId(externalId: string): any;
    create(data: UserCreate): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findUserByExternalId(externalId: string): Promise<User | null>;
    delete(id: string): Promise<void>;
    userUpdate(data: UserUpdate): Promise<UserUpdate>;
    userUpdateByClerk(data: UserUpdateByClerk): Promise<UserUpdateByClerk>;
    findUserByExternalOrId(id: string): Promise<User | null>;
}
