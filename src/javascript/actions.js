export const UPDATE_FILTER = 'UPDATE_FILTER';

export const updateFilter = filters => ({
  type: UPDATE_FILTER,
  filters,
});

export const TOGGLE_EXTRA = 'TOGGLE_EXTRA';

export const toggleExtra = () => ({
  type: TOGGLE_EXTRA,
});
