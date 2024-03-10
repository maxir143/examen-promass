export function parseShortDate(date: string | Date) {
  // dar formato a la fecha
  return new Date(date).toLocaleDateString("MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
