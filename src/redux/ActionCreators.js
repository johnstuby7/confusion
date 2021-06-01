// Standardized way of importing all action types into action creator
import * as ActionTypes from './ActionTypes';

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
