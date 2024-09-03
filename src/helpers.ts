export const calculateTotalCount = (items: []) => {
  return items.reduce((sum: number, item: { count: number }) => sum + item.count, 0)
}
