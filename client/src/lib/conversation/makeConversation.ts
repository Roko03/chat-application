export default async function makeConversetion(reciever: string) {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/conversation/${reciever}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const json = await response.json()

    return json
}