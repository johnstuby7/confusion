// Standardized way of importing all action types into action creator
import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

// payload is everything that needs to be to be carried by the action to the reducer
export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
});

// pushes updated state of dish into store on change
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  setTimeout(() => {
    dispatch(addDishes(DISHES));
  }, 2000);
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

// used to return error messages
export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
