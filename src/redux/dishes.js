import { DISHES } from '../shared/dishes';

// If state is undefined then it will return the DISHES state
export const Dishes = (state = DISHES, action) => {
  switch(action.type) {
    default:
      return state;
  }
}
