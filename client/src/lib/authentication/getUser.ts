export default async function getUser() {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/login`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!response.ok) {
        return { success: false }
    }

    const json = await response.json()
    return { success: true, ...json }
}