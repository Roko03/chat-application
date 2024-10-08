export default async function getUser() {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/login`, {
        method: 'GET',
        credentials: 'include'
    })

    const json = await response.json()

    if (!response.ok) {
        return { success: false, ...json }
    }

    return { success: true, ...json }
}