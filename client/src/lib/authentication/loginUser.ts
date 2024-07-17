import { TLoginSchema } from "../../pages/authentication-page/components/login-form/LoginFormComponent";

export default async function loginUser(data: TLoginSchema) {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) return { success: false, message: "Neuspjela prijava" }

    const json = await response.json()
    return { success: true, ...json }

}