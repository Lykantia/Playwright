export interface User {
    username: string;
    password: string;
    role?: string;
    status?: string;
}

export const normalUser: User = {
    username: 'standard_user',
    password: 'secret_sauce',
    role: 'user',
    status: 'active',
};

export const bannedUser: User = {
    username: 'locked_out_user',
    password: 'secret_sauce',
    role: 'user',
    status: 'banned',
};

export const emptyUser: User = {
    username: '',
    password: '',
    role: 'user',
    status: 'empty',
};

export const invalidUser: User = {
    username: 'Test',
    password: 'Password',
    role: 'user',
    status: 'invalid',
};