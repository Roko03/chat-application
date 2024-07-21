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

type Message = {
    _id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

type Conversation = {
    _id: string;
    participants: string[]
    messages: Message[]
}