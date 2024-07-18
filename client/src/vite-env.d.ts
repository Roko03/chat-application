/// <reference types="vite/client" />

type User = {
    username: String;
    email: string;
    password: string;
}

type UserDB = {
    _id: string;
    username: string;
    email: string;
    password: string;
}