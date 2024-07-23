export const formatDate = (dateString: string): string => {
    let date = new Date(dateString)

    let YY = date.getFullYear()
    let MM = String(date.getMonth() + 1).padStart(2, '0')
    let DD = String(date.getDate()).padStart(2, '0')

    let hh = String(date.getHours()).padStart(2, '0')
    let mm = String(date.getMinutes()).padStart(2, '0')


    return `${DD}/${MM}/${YY} - ${hh}:${mm}`
}