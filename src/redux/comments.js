import * as ActionTypes from './ActionTypes';

// comment.id = state.length, this will increment each new comment id up by 1
// return state.concat() this will return a new object so the state of the
// original object isnt mutated
// line 10 and line 21 needs to set comment to the comment array
export const Comments = (state = {
  errMess: null,
  comments: []
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, isLoading: false, errMess: null, comments: action.payload }

    case ActionTypes.COMMENTS_FAILED:
        return {...state, isLoading: false, errMess: action.payload, comments: [] }

    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      console.log("Comment: ", comment)
      return {...state, comments: state.comments.concat(comment)};
    default:
      return state;
  }
}
