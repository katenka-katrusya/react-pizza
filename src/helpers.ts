export const calculateTotalCount = (items: { count: number }[]) => {
  return items.reduce((sum: number, item: { count: number }) => sum + item.count, 0)
}
