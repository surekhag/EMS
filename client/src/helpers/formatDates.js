export function formatDate(date) {
  return formatDateDDMMYYYY(date.slice(0, 10))
}

export function getMonthOfDate(date) {
  return ('0' + (date.getMonth() + 1)).slice(-2)
}

export function getDayOfDate(date) {
  return ('0' + date.getDate()).slice(-2)
}

export function formatDateDDMMYYYY(date) {
  const newdate = new Date(date)
  const mnth = getMonthOfDate(newdate)
  const day = getDayOfDate(newdate)
  return [day, mnth, newdate.getFullYear()].join('/')
}
