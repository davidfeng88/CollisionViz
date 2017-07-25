import { fetchAllCollisions } from './collision_actions';

export const UPDATE_OPTION = 'UPDATE_OPTION';
export const RESET_OPTION = 'RESET_OPTION';

export const resetOption = () => ({
  type: RESET_OPTION
});

export const changeOption = (options) => ({
  type: UPDATE_OPTION,
  options,
});

export const updateOption = (options) => (dispatch, getState) => {
  dispatch(changeOption(options));
  return fetchAllCollisions(getState().options)(dispatch);
};
