export default async function getAllUsers() {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user`, {
        method: 'GET',
        credentials: 'include'
    })

    return await response.json()
}