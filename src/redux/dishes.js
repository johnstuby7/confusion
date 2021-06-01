import * as ActionTypes from './ActionTypes';

// If state is undefined then it will return the DISHES state
// ...state take the current value of the state, then returns a new object with the changes that were made
//  You set the  addDishes dishes to action.payload which is definied in the action creator for that action
export const Dishes = (state = {
  isLoading: true,
  errMess: null,
  dishes: []
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_DISHES:
      return {...state, isLoading: false, errMess: null, dishes: action.payload }

    case ActionTypes.DISHES_LOADING:
      return {...state, isLoading: true, errMess: null, dishes: [] }

    case ActionTypes.DISHES_FAILED:
      return {...state, isLoading: false, errMess: action.payload, dishes: [] }

    default:
      return state;
  }
}
