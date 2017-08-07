export const UPDATE_FILTER = 'UPDATE_FILTER';
export const RESET_FILTER = 'RESET_FILTER';

export const resetFilter = () => ({
  type: RESET_FILTER
});

export const updateFilter = (filters) => ({
  type: UPDATE_FILTER,
  filters,
});
