export default async function registerUser(data: User) {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/register/`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) return { success: false, message: "Greška prilikom registracije" }

    const json = await response.json()

    return { success: true, json }
}