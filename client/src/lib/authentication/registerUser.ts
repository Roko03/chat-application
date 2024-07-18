export default async function registerUser(data: User) {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/register/`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()

    if (!response.ok) return { success: false, ...json }


    return { success: true, ...json }
}