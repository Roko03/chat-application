export default async function logoutUser() {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    })

    const json = await response.json()

    if (!response.ok) return { success: false, ...json }

    return { success: true }

}