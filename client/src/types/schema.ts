import { z } from "zod"
import { patterns } from "../constants"


export const registerSchema = z.object({
    username: z.string().min(1, { message: "Unesite korisničko ime" }),
    email: z.string().min(1, { message: "Unesite email" })
        .refine((text) => patterns.email.test(text), { message: "Unesite valjani email" }),
    password: z.string().min(6, { message: 'Šifra treba imati minimalno 6 znakova' }),
    repeatPassword: z.string().min(6, { message: 'Šifra treba imati minimalno 6 znakova' })
}).refine((data) => data.password === data.repeatPassword, {
    message: "Lozinke se ne poklapaju",
    path: ["repeatPassword"]
})

export const loginSchema = z.object({
    email: z.string().min(1, { message: "Unesite email" })
        .refine((text) => patterns.email.test(text), { message: "Unesite valjani email" }),
    password: z.string().min(6, { message: 'Šifra treba imati minimalno 6 znakova' })
})