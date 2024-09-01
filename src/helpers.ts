export const calculateTotalCount = (items) => items.reduce((sum, item) => sum + item.count, 0)
