/// <reference types="vite/client" />

type User = {
    username: String;
    email: string;
    password: string;
}

type UserWithoutPwd = {
    _id: string;
    username: String;
    email: string;
}

type UserDB = {
    _id: string;
    username: string;
    email: string;
    password: string;
}

type Message = {
    _id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    recipient: UserWithoutPwd
    sender: UserWithoutPwd
}

type Conversation = {
    _id: string;
    participants: string[]
    messages: Message[]
}