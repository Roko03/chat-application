export const formatDate = (dateString: string): string => {
    let date = new Date(dateString)

    let YY = date.getUTCFullYear()
    let MM = String(date.getUTCMonth() + 1).padStart(2, '0')
    let DD = String(date.getUTCDate()).padStart(2, '0')

    let hh = String(date.getUTCHours()).padStart(2, '0')
    let mm = String(date.getUTCMinutes()).padStart(2, '0')


    return `${DD}/${MM}/${YY} - ${hh}:${mm}`
}