// Standardized way of importing all action types into action creator
import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

// // payload is everything that needs to be to be carried by the action to the reducer
export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })

  .then(response => {
    if (response.ok) {
      return response;
    }
    else {
      var error = new Error('Error' + response.status + ': ' + response.statusText)
      error.response = response;
      throw error;
    }
  },
  error => {
    var errmess = new Error(error.message);
    throw errmess;
  })

  .then(response => response.json())
  .then(response => dispatch(addComment(response)))
  .catch(error => { console.log('Post comments ', error.message)
    alert('Your comment could not be posted\nError: ' + error.message); });
}

// pushes updated state of dish into store on change
// Fetch returns localhost:3001/ and add dishes after the slash, once the dishes
// are obtained, it will push the dishes into the redux store
// The If Statement in the return fetch is handling error messages for fetch dishes
// and the .catch at the end
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error' + response.status + ': ' + response.statusText)
        error.response = response;
        throw error;
      }
    },
    error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
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

export const fetchComments= () => (dispatch) => {
  return fetch(baseUrl + 'comments')
  .then(response => {
    if (response.ok) {
      return response;
    }
    else {
      var error = new Error('Error' + response.status + ': ' + response.statusText)
      error.response = response;
      throw error;
    }
  },
  error => {
    var errmess = new Error(error.message);
    throw errmess;
  })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
  .then(response => {
    if (response.ok) {
      return response;
    }
    else {
      var error = new Error('Error' + response.status + ': ' + response.statusText)
      error.response = response;
      throw error;
    }
  },
  error => {
    var errmess = new Error(error.message);
    throw errmess;
  })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
