export function parseShortDate(date: string | Date) {
  return new Date(date).toLocaleDateString("MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
