export function useCalculateDate(date) {
  let TotalDays = Math.ceil((new Date() - new Date(date)) / (1000 * 3600 * 24));
  return { TotalDays };
}
