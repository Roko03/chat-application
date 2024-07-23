export default async function makeMessage(reciever: string, data: string) {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/conversation/${reciever}/message`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ message: data })
    })

    const json = await response.json()

    if (!response.ok) return { success: false, ...json }

    return { success: true, ...json }
}