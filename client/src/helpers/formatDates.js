export function formatDate(date){
    return date.slice(0, 10)
}

export function getMonthOfDate(date){
    return  ('0' + (date.getMonth() + 1)).slice(-2)
}

export function getDayOfDate(date){
    return ('0' + date.getDate()).slice(-2)
}