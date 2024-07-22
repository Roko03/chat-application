export default async function getConversetion(reciever: string) {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/conversation/${reciever}`, {
        method: 'GET',
        credentials: 'include'
    })

    const json = await response.json()

    return json
}