export default async function getAllUsers() {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user`, {
        method: 'GET',
        credentials: 'include'
    })

    const json = await response.json()

    if (!response.ok) return { success: false, ...json }

    return { success: true, user: json }
}