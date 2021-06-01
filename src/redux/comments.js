import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

// comment.id = state.length, this will increment each new comment id up by 1
// return state.concat() this will return a new object so the state of the
// original object isnt mutated
export const Comments = (state = COMMENTS, action) => {
  switch(action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      console.log("Comment: ", comment)
      return state.concat(comment);
    default:
      return state;
  }
}
